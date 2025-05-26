import type { Dispatch, PropsWithChildren } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import React, { createContext, useContext, useState } from 'react'

import type { Pagination } from '@/@types/api/api'
import type { EachProduct, ProductCaracteristics, ProductHistory, ProductsPaginated } from '@/@types/api/products'

import { cifraApi } from '@/libs/cifra-api'

export type ProductDetailType = {
  productData?: EachProduct
  productHistoryData?: Pagination<ProductHistory>
  whereToBuyList: ProductsPaginated['results']
  productCharacteristicsData?: Pagination<ProductCaracteristics>
  isLoading: boolean
  isFetchingHistory: boolean
  setStartAt: Dispatch<React.SetStateAction<Date | undefined>>
  setEndAt: Dispatch<React.SetStateAction<Date | undefined>>
  rangeInMonths: number | null
  setRangeInMonths: Dispatch<React.SetStateAction<number | null>>
}

export const ProductDetailContext = createContext<ProductDetailType | undefined>(undefined)

export function ProductDetailProvider({ children }: PropsWithChildren) {
  const { id }: { id: string } = useLocalSearchParams()

  const [startAt, setStartAt] = useState<Date | undefined>(undefined)
  const [endAt, setEndAt] = useState<Date | undefined>(undefined)
  const [rangeInMonths, setRangeInMonths] = useState<number | null>(null)

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

  const { data: productHistoryData, isFetching: isFetchingHistory } = useQuery({
    queryKey: ['product-history', id, startAt, endAt],
    queryFn: async () => await productHistory({ id, endAt, startAt }),
    enabled: !!id && !!startAt && !!endAt,
  })

  const { data: productCharacteristicsData, isFetching: isFetchingCharacteristics } = useQuery({
    queryKey: ['product-characteristics', id],
    queryFn: async () => await productCharacteristics(id),
    enabled: !!id,
  })

  const isLoading = isFetching || !productData || isFetchingWhereToBuy || isFetchingCharacteristics

  const value = React.useMemo(() => {
    const whereToBuyList = whereToBuyData ?? []
    return {
      productData,
      isLoading,
      whereToBuyList,
      productHistoryData,
      isFetchingHistory,
      setStartAt,
      setEndAt,
      rangeInMonths,
      productCharacteristicsData,
      setRangeInMonths,
    }
  }, [
    productData,
    isLoading,
    whereToBuyData,
    productHistoryData,
    isFetchingHistory,
    setStartAt,
    setEndAt,
    rangeInMonths,
    setRangeInMonths,
    productCharacteristicsData,
  ])

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
  })

  const sorted = data.results.sort((a, b) => {
    const priceA = Number.parseFloat(a.price)
    const priceB = Number.parseFloat(b.price)
    return priceA > priceB ? 1 : priceA < priceB ? -1 : 0
  })

  return sorted
}
async function productHistory({
  id,
  startAt,
  endAt,
}: {
  id: string
  startAt?: Date
  endAt?: Date
}) {
  if (!startAt || !endAt) {
    throw new Error('startAt and endAt must be defined')
  }

  const { data } = await cifraApi.get<Pagination<ProductHistory>>(
    `/api/stores/products/{product_pk}/historic/`,
    {
      routeParams: { product_pk: id },
      params: {
        start_at: startAt.toISOString(),
        end_at: endAt.toISOString(),
      },
    },
  )

  return data
}

async function productCharacteristics(id: string) {
  const { data } = await cifraApi.get<Pagination<ProductCaracteristics>>(
    '/api/stores/products/{product_pk}/characteristics/',
    {
      routeParams: {
        product_pk: id,
      },
    },
  )

  return data
}
