import { faChevronLeft, faCog, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { router, useGlobalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import type { EachListProduct, ListProductPaginated } from '@/@types/api/lists'

import { EditProductOnListSheet } from '@/components/lists/edit-product-on-list-sheet'
import { ListSavedProductCard } from '@/components/lists/list-saved-product-card'
import { RemoveProductFromListSheet } from '@/components/lists/remove-product-from-list-sheet'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { cifraApi } from '@/libs/cifra-api'
import { useTheme } from '@/providers/theme-provider'

import { getList } from './add-products'

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
  const { theme, setStatusBarStyle } = useTheme()
  const { top, bottom } = useSafeAreaInsets()
  const params = useGlobalSearchParams<{ id: string }>()
  const listQuery = useQuery({
    queryKey: ['list-by-id', params.id],
    queryFn: () => getList(params.id),
  })
  const productsQuery = useInfiniteQuery({
    queryKey: ['list-products'],
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

  useEffect(() => {
    setStatusBarStyle('dark')
  }, [])

  return (
    <VStack flex={1} alignItems="stretch" paddingBottom={bottom}>
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
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: 'center', height: 30, width: 30 }}
          onPress={() => {
            router.navigate({
              pathname: '/lists/[id]/settings',
              params: { id: String(params.id) },
            })
          }}
        >
          <FontAwesomeIcon color={theme.colors.darkBlue[700]} icon={faCog} size={18} />
        </TouchableOpacity>
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

      <VStack
        alignItems="stretch"
        padding={theme.spacing['3xl']}
        backgroundColor="#fff"
      >
        <Text
          color={theme.colors.gray[400]}
          fontSize={theme.font.size.md}
          fontWeight={theme.font.weight.medium}
        >
          Total
        </Text>
        <Text
          color={theme.colors.gray[600]}
          fontSize={theme.font.size.lg}
          fontWeight={theme.font.weight.bold}
        >
          R$
          {' '}
          {Number.parseFloat(String(listQuery.data?.total_price || 0)).toFixed(2).replace('.', ',')}
        </Text>
      </VStack>

      <Button
        variant="secondary"
        radius="full"
        width={60}
        height={60}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 80 + bottom,
          paddingHorizontal: 0,
          paddingVertical: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => router.push({
          pathname: '/(private)/lists/[id]/add-products',
          params: { id: params.id },
        })}
      >
        <FontAwesomeIcon
          color={theme.colors.gray[600]}
          icon={faPlus}
          size={14}
        />
      </Button>

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
