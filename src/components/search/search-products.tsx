import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'expo-router/build/hooks'
import { FlatList } from 'react-native'

import type { Pagination } from '@/@types/api/api'
import type { EachProduct, ProductsPaginated } from '@/@types/api/products'

import { VStack } from '@/components/ui/view'
import { cifraApi } from '@/libs/cifra-api'
import { useTheme } from '@/providers/theme-provider'

import { Text } from '../ui/text'
import { ProductCard } from './search-product-card'

export async function fetchProducts({ pageParam = 0, search, category }: {
  pageParam?: number
  search?: string
  category?: string
}): Promise<Pagination<EachProduct>> {
  const { data } = await cifraApi.get<ProductsPaginated>('/api/stores/products/', {
    params: {
      search,
      category,
      limit: 10,
      offset: pageParam,
    },
  })

  return data
}

export function Products({ search }: { search?: string }) {
  const params = useSearchParams()

  const category = params.get('category') || ''

  const { theme } = useTheme()

  const query = useInfiniteQuery({
    queryKey: ['products', search, category],
    queryFn: ({ pageParam = 0 }) =>
      fetchProducts({ pageParam, search, category }),
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce((acc, page) => acc + page.results.length, 0)
      return totalFetched < lastPage.count ? totalFetched : undefined
    },
    enabled: (search?.length && search.length > 0) || category.length > 0,
    initialPageParam: 0,
  })

  const products = query.data?.pages.flatMap(page => page.results) || []
  return (
    <VStack gap={theme.spacing['4xl']} marginTop={theme.spacing.xl} flex={1}>
      {!query.isLoading && category
        ? (
            <Text paddingHorizontal={theme.spacing['6xl']} fontWeight={400} fontSize={theme.font.size.md}>
              Exibindo
              {' '}
              {query.data?.pages[0]?.count}
              {' '}
              produto(s)
            </Text>
          )
        : <></>}
      <FlatList
        data={products}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        onEndReached={() => {
          if (query.hasNextPage && !query.isFetchingNextPage) {
            query.fetchNextPage()
          }
        }}
        onEndReachedThreshold={0.5}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: theme.spacing['4xl'],
          gap: theme.spacing['4xl'],
        }}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing['6xl'],
          paddingBottom: theme.spacing['6xl'],
        }}
        renderItem={({ item }) => <ProductCard {...item} />}
      />
    </VStack>
  )
}
