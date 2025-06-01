import ContentLoader, { Rect } from 'react-content-loader/native'
import { FlatList } from 'react-native'

import type { CategoriesPaginated } from '@/@types/api/categories'

import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { defaultTheme } from '@/constants/theme'

import { CategoryCard } from './home-category-card'

export function Categories({ data, isLoading }: {
  data: CategoriesPaginated['results']
  isLoading?: boolean
}) {
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
          data={data}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={
            (item, idx) => item + idx.toString()
          }
          scrollEnabled={isLoading}
          horizontal
          style={{
            gap: defaultTheme.spacing.lg,
            paddingBottom: defaultTheme.spacing.xl,
          }}
          ItemSeparatorComponent={() => <HStack width={defaultTheme.spacing.lg} />}
          ListEmptyComponent={() => (
            <HStack gap={defaultTheme.spacing.lg}>
              {isLoading
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
