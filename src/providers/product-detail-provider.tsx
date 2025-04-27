import type { PropsWithChildren } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import React, { createContext, useContext } from 'react'

import type { EachProduct } from '@/@types/api/products'

import { cifraApi } from '@/libs/rest-client'

export type ProductDetailType = {
  productData?: EachProduct
  isLoading: boolean
}

export const ProductDetailContext = createContext<ProductDetailType | undefined>(undefined)

export function ProductDetailProvider({ children }: PropsWithChildren) {
  const { id }: { id: string } = useLocalSearchParams()

  const { data: productData, isFetching } = useQuery({
    queryKey: ['product-detail', id],
    queryFn: () => retrieveProductById({ id }),
  })

  const isLoading = isFetching || !productData

  const value = React.useMemo(() => ({ productData, isLoading }), [productData, isLoading])

  return (
    <ProductDetailContext.Provider value={value}>
      {children}
    </ProductDetailContext.Provider>
  )
}

export function useProductDetail(): ProductDetailType {
  const context = useContext(ProductDetailContext)
  if (!context) {
    throw new Error('useProduct must be used within a ProductDetailProvider')
  }
  return context
}

async function retrieveProductById({ id }: { id: string }) {
  const { data } = await cifraApi.get<EachProduct>('/api/stores/products/{id}/', {
    routeParams: { id },
  })

  return data
}
