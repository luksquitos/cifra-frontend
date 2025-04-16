import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'expo-router/build/hooks'
import { FlatList } from 'react-native'

import type { Pagination } from '@/@types/api/api'
import type { EachProduct, FetchProductsFilter, ProductsPaginated } from '@/@types/api/products'

import { HStack, VStack } from '@/components/ui/view'
import { cifraApi } from '@/libs/rest-client'
import { useTheme } from '@/providers/theme-provider'

import { Text } from '../ui/text'
import { ProductCard } from './search-product-card'

async function fetchProducts(query?: FetchProductsFilter): Promise<Pagination<EachProduct>> {
  const { data } = await cifraApi.get<ProductsPaginated>('/api/stores/products/', { params: query })
  return data
}

export function Products() {
  const params = useSearchParams()
  const search = params.get('search') || ''
  const category = params.get('category') || ''

  const { theme } = useTheme()

  const query = useQuery({
    queryKey: ['products', search, category],
    queryFn: async () => { return await fetchProducts({ search, category }) },
  })

  const products = query.data?.results || []

  return (
    <VStack gap={theme.spacing['4xl']}>
      {query.data?.count && (
        <Text fontWeight={500} paddingHorizontal={theme.spacing['6xl']}>
          Exibindo
          {' '}
          {query.data?.count}
          {' '}
          produtos
        </Text>
      )}
      <HStack overflow="visible">
        <FlatList
          data={products}
          keyExtractor={(item, idx) => item.id + idx.toString()}
          ListEmptyComponent={<Text>Nenhum Produto encontrado</Text>}
          numColumns={2}
          columnWrapperStyle={{ gap: theme.spacing['4xl'] }}
          contentContainerStyle={{ gap: theme.spacing['4xl'], paddingHorizontal: theme.spacing['6xl'] }}
          renderItem={({ item }) => <ProductCard {...item} />}
        />
      </HStack>

    </VStack>
  )
}
