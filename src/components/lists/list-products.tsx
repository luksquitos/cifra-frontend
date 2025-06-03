import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native'

import type { EachProduct } from '@/@types/api/products'

import { fetchProductsByCategories } from '@/app/(private)/(tabs)/(home)'

import { fetchProducts } from '../search/search-products'
import { AddProductToListSheet } from './add-product-to-list-sheet'
import { Products } from './list-products-category'

function ListAllProducsts() {
  const productQuery = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductsByCategories,
  })
  const [buyingItem, setBuyingItem] = useState<EachProduct | null>(null)

  const productByCategory = productQuery.data?.productsData ?? []
  const isLoading = productQuery.isLoading || productQuery.isFetching

  function handleRefresh() {
    productQuery.refetch()
  }

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
      >
        <Products
          data={productByCategory}
          onBuy={product => setBuyingItem(product)}
        />
      </ScrollView>
      {buyingItem && (
        <AddProductToListSheet
          product={buyingItem}
          onClose={() => setBuyingItem(null)}
        />
      )}
    </>
  )
}

function ListSearchProducts({ search }: { search: string }) {
  const query = useInfiniteQuery({
    queryKey: ['list-search-products', search],
    queryFn: async ({ pageParam }) => {
      return fetchProducts({ pageParam, search })
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce((acc, page) => acc + page.results.length, 0)
      return totalFetched < lastPage.count ? totalFetched : undefined
    },
    initialPageParam: 0,
  })
  const products = query.data?.pages.flatMap(page => page.results) || []
  const isLoading = query.isLoading || query.isFetching

  const [buyingItem, setBuyingItem] = useState<EachProduct | null>(null)

  function handleRefresh() {
    query.refetch()
  }

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
      >
        <Products
          data={[
            {
              category: {
                id: 1,
                name: 'Resultados da busca',
              },
              products,
            },
          ]}
          onBuy={product => setBuyingItem(product)}
        />
      </ScrollView>
      {buyingItem && (
        <AddProductToListSheet
          product={buyingItem}
          onClose={() => setBuyingItem(null)}
        />
      )}
    </>
  )
}

export function ListProducts({ search }: { search: string }) {
  if (!search) {
    return <ListAllProducsts />
  }
  return <ListSearchProducts search={search} />
}
