import type { PropsWithChildren } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import React, { createContext, useContext } from 'react'

import type { EachProduct, ProductsPaginated } from '@/@types/api/products'

import { cifraApi } from '@/libs/rest-client'

export type ProductDetailType = {
  productData?: EachProduct
  whereToBuyList: ProductsPaginated['results']
  isLoading: boolean
}

export const ProductDetailContext = createContext<ProductDetailType | undefined>(undefined)

export function ProductDetailProvider({ children }: PropsWithChildren) {
  const { id }: { id: string } = useLocalSearchParams()

  const { data: productData, isFetching } = useQuery({
    queryKey: ['product-detail', id],
    queryFn: async () => await retrieveProductById({ id }),
  })

  const { data: whereToBuyData, isFetching: isFetchingWhereToBuy } = useQuery(
    {
      queryKey: ['where-to-buy', id],
      queryFn: async () => await retrieveWhereToBuy({ name: productData?.name ?? '' }),
      enabled: !!productData,
    },
  )

  const isLoading = isFetching || !productData || isFetchingWhereToBuy

  const value = React.useMemo(() => {
    const whereToBuyList = whereToBuyData ?? []
    return { productData, isLoading, whereToBuyList }
  }, [productData, isLoading, whereToBuyData])

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

async function retrieveWhereToBuy({ name }: { name: string }): Promise<EachProduct[]> {
  const { data } = await cifraApi.get<ProductsPaginated>('/api/stores/products/', {
    params: {
      search: name,
    },
  });

  const sorted = data.results.sort((a, b) => {
    const priceA = Number.parseFloat(a.price);
    const priceB = Number.parseFloat(b.price);
    return priceA > priceB ? 1 : priceA < priceB ? -1 : 0;
  }); 

  return sorted;
}
