import { faBell } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useQuery } from '@tanstack/react-query'
import ContentLoader, { Circle, Path, Rect } from 'react-content-loader/native'
import { FlatList, TouchableOpacity } from 'react-native'

import type { CategoriesPaginated, EachCategory } from '@/@types/api/categories'

import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { defaultTheme } from '@/constants/theme'
import { cifraApi } from '@/libs/rest-client'

import { CategoryCard } from './home-category-card'

async function fetchCategories() {
  const { data } = await cifraApi.get<CategoriesPaginated>('/api/stores/categories/')

  return data
}

export function Categories() {
  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return await fetchCategories()
    },
  })

  const categoriesData = categories.data?.results as EachCategory[]

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
