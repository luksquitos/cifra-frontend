import { useQuery } from '@tanstack/react-query'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { FlatList } from 'react-native'

import type { CategoriesPaginated, CategoriesQuery, EachCategory } from '@/@types/api/categories'

import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { defaultTheme } from '@/constants/theme'
import { cifraApi } from '@/libs/rest-client'

import { CategoryCard } from './home-category-card'

async function fetchCategories(query?: CategoriesQuery) {
  const { data } = await cifraApi.get<CategoriesPaginated>('/api/stores/categories/', { params: query })
  console.log('data', data)

  return data
}

export function Categories() {
  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return await fetchCategories({ height: '20', width: '20', fill_path: '#FED641', fill_svg: '#FED641' })
    },
  })

  const categoriesData = (categories.data ?? []) as EachCategory[]
  console.log(categoriesData)

  return (
    <VStack
      gap={defaultTheme.spacing['4xl']}
      paddingHorizontal={defaultTheme.spacing['6xl']}
      marginTop={defaultTheme.spacing['6xl']}
    >
      <Text
        fontSize={defaultTheme.font.size.lg}
        fontWeight="500"
      >
        Categorias
      </Text>
      <HStack>
        <FlatList
          data={categoriesData}
          keyExtractor={
            (item, idx) => item + idx.toString()
          }
          scrollEnabled={!categories.isLoading}
          horizontal
          style={{
            gap: defaultTheme.spacing.lg,
            paddingBottom: defaultTheme.spacing.xl,
          }}
          ItemSeparatorComponent={() => <HStack width={defaultTheme.spacing.lg} />}
          ListEmptyComponent={() => (
            <HStack gap={defaultTheme.spacing.lg}>
              {categories.isLoading
                ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <ContentLoader
                        key={index}
                        width={90}
                        height={90}
                        style={{ borderRadius: defaultTheme.radius.xl }}
                      >
                        <Rect
                          x="0"
                          y="0"
                          rx={defaultTheme.radius.xl}
                          ry={defaultTheme.radius.xl}
                          width="90"
                          height="90"
                          fill={defaultTheme.colors.gray[400]}
                        />
                      </ContentLoader>
                    ))
                  )
                : (
                    <Text>Nenhuma categoria encontrada</Text>
                  )}
            </HStack>
          )}
          renderItem={
            ({ item }) =>
              <CategoryCard item={item} key={item.id} />
          }
        />
      </HStack>
    </VStack>
  )
}
