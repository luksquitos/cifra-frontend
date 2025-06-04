import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { router, useGlobalSearchParams } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Alert, FlatList, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import type { EachListProduct, ListProductPaginated } from '@/@types/api/lists'

import { EditProductOnListSheet } from '@/components/lists/edit-product-on-list-sheet'
import { ListSavedProductCard } from '@/components/lists/list-saved-product-card'
import { RemoveProductFromListSheet } from '@/components/lists/remove-product-from-list-sheet'
import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { cifraApi } from '@/libs/cifra-api'
import { useTheme } from '@/providers/theme-provider'

import { getList } from './add-products'
import { Button } from '@/components/ui/button'

async function fetchListProducts(list: number | string, page: number) {
  const { data } = await cifraApi.get<ListProductPaginated>('/api/lists/{list_pk}/products/', {
    params: {
      limit: 10,
      offset: (page - 1) * 10,
    },
    routeParams: { list_pk: String(list) },
  })
  return data
}

export default function ManageListPage() {
  const { theme } = useTheme()
  const { top } = useSafeAreaInsets()
  const params = useGlobalSearchParams<{ id: string }>()
  const listQuery = useQuery({
    queryKey: ['list-by-id', params.id],
    queryFn: () => getList(params.id),
  })
  const productsQuery = useInfiniteQuery({
    queryKey: ['lists'],
    queryFn: async ({ pageParam }) => {
      return fetchListProducts(params.id, pageParam)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next) {
        return null
      }
      return pages.length + 1
    },
  })
  const products = productsQuery.data?.pages.flatMap(page => page.results) || []

  const [deletingItem, setDeletingItem] = useState<EachListProduct | null>(null)
  const [editingItem, setEditingItem] = useState<EachListProduct | null>(null)

  return (
    <VStack flex={1} alignItems="stretch">
      <HStack
        backgroundColor={theme.colors.gray[0]}
        paddingTop={top + theme.spacing['2xl']}
        paddingBottom={theme.spacing['2xl']}
        width="100%"
        gap={theme.spacing['4xl']}
        justifyContent="space-between"
        paddingHorizontal={theme.spacing['6xl']}
      >
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: 'center', height: 30, width: 30 }}
          onPress={() => router.back()}
        >
          <FontAwesomeIcon color={theme.colors.darkBlue[700]} icon={faChevronLeft} size={18} />
        </TouchableOpacity>
        <Text
          flex={1}
          fontSize={theme.font.size.lg}
          fontWeight={500}
          color={theme.colors.gray[700]}
          textAlign="center"
        >
          {listQuery.data?.name || 'Carregando...'}
        </Text>
      </HStack>

      <VStack flex={1} alignItems="stretch">
        <FlatList
          data={products}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={() => {
            if (productsQuery.hasNextPage && !productsQuery.isFetchingNextPage) {
              productsQuery.fetchNextPage()
            }
          }}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{
            paddingVertical: theme.spacing['6xl'],
            paddingHorizontal: theme.spacing['6xl'],
            alignItems: 'stretch',
          }}
          renderItem={({ item }) => (
            <ListSavedProductCard
              onDelete={() => setDeletingItem(item)}
              onEdit={() => setEditingItem(item)}
              {...item}
            />
          )}
          onRefresh={() => productsQuery.refetch()}
          refreshing={productsQuery.isPending || productsQuery.isLoading}
        />
      </VStack>

      <VStack alignItems="stretch" padding={theme.spacing['3xl']}>
        <Button
          variant="secondary"
          radius="md"
          style={{ marginTop: theme.spacing['3xl'] }}
          onPress={() => router.push({
            pathname: '/(private)/(tabs)/lists/[id]/add-products',
            params: { id: params.id }
          })}
        >
          <Text textAlign="center">Adicionar produtos</Text>
        </Button>
      </VStack>

      {deletingItem && (
        <RemoveProductFromListSheet
          product={deletingItem}
          onClose={async () => {
            setDeletingItem(null)
            await productsQuery.refetch()
          }}
        />
      )}

      {editingItem && (
        <EditProductOnListSheet
          product={editingItem}
          onClose={async () => {
            setEditingItem(null)
            await productsQuery.refetch()
          }}
        />
      )}
    </VStack>
  )
}
