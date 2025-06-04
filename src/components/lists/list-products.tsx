import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { router, useGlobalSearchParams } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Alert, RefreshControl, ScrollView } from 'react-native'

import type { EachProduct } from '@/@types/api/products'

import { fetchProductsByCategories } from '@/app/(private)/(tabs)/(home)'
import { cifraApi } from '@/libs/cifra-api'
import { useTheme } from '@/providers/theme-provider'

import { fetchProducts } from '../search/search-products'
import { Button } from '../ui/button'
import { Text } from '../ui/text'
import { VStack } from '../ui/view'
import { AddProductToListSheet } from './add-product-to-list-sheet'
import { Products } from './list-products-category'

async function recalculate(listId: string | number) {
  const { data } = await cifraApi.put<{ id: number }>('/api/lists/{id}/calculate/', {
  }, {
    routeParams: {
      id: String(listId),
    },
  })
  return data
}

function useRecalculateValuesMutation() {
  const params = useGlobalSearchParams<{ id: string }>()
  return useMutation({
    mutationFn: () => {
      return recalculate(params.id)
    },
    onSuccess: async () => {
      router.replace({
        pathname: '/(private)/(tabs)/lists/[id]/manage',
        params: { id: String(params.id) },
      })
    },
    onError: () => {
      Alert.alert(
        'Erro ao atualizar os preços',
        'Tente novamente mais tarde ou verifique os dados informados.',
      )
    },
  })
}

function ListAllProducsts() {
  const { theme } = useTheme()

  const productQuery = useQuery({
    queryKey: ['list-all-products'],
    queryFn: fetchProductsByCategories,
  })
  const [buyingItem, setBuyingItem] = useState<EachProduct | null>(null)

  const productByCategory = productQuery.data?.productsData ?? []
  const isLoading = productQuery.isLoading || productQuery.isFetching

  const recalculateMutation = useRecalculateValuesMutation()

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
      <VStack
        width="100%"
        padding={theme.spacing['3xl']}
        alignItems="stretch"
        zIndex={0}
      >
        <Button
          variant="secondary"
          radius="md"
          disabled={recalculateMutation.isPending}
          onPress={() => recalculateMutation.mutate()}
        >
          {recalculateMutation.isPending
            ? <ActivityIndicator />
            : (
                <Text textAlign="center">Salvar</Text>
              )}
        </Button>
      </VStack>
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
  const { theme } = useTheme()
  const query = useQuery({
    queryKey: ['list-search-products', search],
    queryFn: async () => {
      const data = await fetchProducts({ pageParam: 0, search })
      return {
        ...data,
        results: data.results.filter((_, index) => index === 0),
      }
    },
  })
  const products = query.data?.results || []
  const isLoading = query.isLoading || query.isFetching

  const recalculateMutation = useRecalculateValuesMutation()

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
      <VStack
        width="100%"
        padding={theme.spacing['3xl']}
        alignItems="stretch"
        zIndex={0}
      >
        <Button
          variant="secondary"
          radius="md"
          disabled={recalculateMutation.isPending}
          onPress={() => recalculateMutation.mutate()}
        >
          {recalculateMutation.isPending
            ? <ActivityIndicator />
            : (
                <Text textAlign="center">Salvar</Text>
              )}
        </Button>
      </VStack>
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
