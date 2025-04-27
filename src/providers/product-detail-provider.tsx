import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import React, { createContext, useContext, useState } from 'react'

import type { EachProduct } from '@/@types/api/products'

import { defaultTheme } from '@/constants/theme'
import { cifraApi } from '@/libs/rest-client'

export type ProductDetailType = {
  productId: string
  setProductId: Dispatch<SetStateAction<string>>
}

export const ProductDetailContext = createContext<ProductDetailType | undefined>(undefined)

export function ProductDetailProvider({ children }: { } & PropsWithChildren) {
  const { id }: { id: string } = useLocalSearchParams()

  const { data } = useQuery({
    queryKey: ['product-detail', id],
    queryFn: () => retrieveProductById({ id }),
  })

  const value = React.useMemo(() => ({ productId, setProductId }), [productId])

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
