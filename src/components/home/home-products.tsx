import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList } from 'react-native'

import type { Pagination } from '@/@types/api/api'
import type { CategoriesPaginated } from '@/@types/api/categories'
import type { EachProduct, ProductsPaginated } from '@/@types/api/products'

import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { defaultTheme } from '@/constants/theme'
import { cifraApi } from '@/libs/rest-client'

import { ProductCard } from './product-card'

async function fetchProductsByCategories(): Promise<Pagination<ProductByCategory>> {
  const { data: productsData } = await cifraApi.get<ProductsPaginated>('/api/stores/products/')
  const { data: categoriesData } = await cifraApi.get<CategoriesPaginated>('/api/stores/categories/')

  function segregateProductsByCategory(products: EachProduct[]) {
    const productByCategory: ProductByCategory[] = []

    categoriesData.results.forEach((category) => {
      const productsByCategory = products.filter(product => product.category === category.id)
      if (productsByCategory.length > 0) {
        productByCategory.push({
          category,
          products: productsByCategory,
        })
      }
    })

    return productByCategory
  }

  const segregatedProducts = segregateProductsByCategory(productsData.results)

  return {
    ...productsData,
    results: segregatedProducts,
  }
}

type ProductByCategory = {
  category: { id: number, name: string }
  products: EachProduct[]
}

export function Products() {
  const query = useQuery({
    queryKey: ['products'],
    queryFn: async () => { return await fetchProductsByCategories() },
  })

  const products = query.data?.results || []

  return (
    <FlatList
      data={products}
      keyExtractor={(item, idx) => item?.category + idx.toString()}
      renderItem={({ item, index }) => (
        <VStack
          gap={defaultTheme.spacing['4xl']}
          paddingHorizontal={defaultTheme.spacing['6xl']}
          marginTop={defaultTheme.spacing['6xl']}
        >
          <Text fontSize={defaultTheme.font.size.lg} fontWeight="500">{item.category?.name}</Text>
          <HStack overflow="visible">
            <FlatList
              data={item.products}
              keyExtractor={(item, idx) => item.id + idx.toString()}

              horizontal
              style={{
                gap: defaultTheme.spacing.lg,
                paddingBottom: defaultTheme.spacing.xl,
                overscrollBehaviorX: 'auto',
              }}
              ItemSeparatorComponent={() => <HStack width={defaultTheme.spacing['4xl']} />}
              renderItem={
                ({ item, index }) =>
                  (
                    <ProductCard {...item} />
                  )
              }
            />
          </HStack>
        </VStack>
      )}
    />
  )
}
