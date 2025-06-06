import { FlatList } from 'react-native'

import type { ProductByCategory } from '@/app/(private)/(tabs)/(home)'

import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { defaultTheme } from '@/constants/theme'

import { ProductCard } from './product-card'

export function Products({ data }: { data: ProductByCategory[] }) {
  return (
    <VStack>
      {data.map(item => (
        <VStack
          key={item.category.id}
          gap={defaultTheme.spacing['4xl']}
          paddingHorizontal={defaultTheme.spacing['6xl']}
          marginTop={defaultTheme.spacing['6xl']}
        >
          <Text fontSize={defaultTheme.font.size.lg} fontWeight="500">{item.category?.name}</Text>
          <HStack overflow="visible">
            <FlatList
              data={item.products}
              keyExtractor={(item, idx) => item.id + idx.toString()}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              horizontal
              style={{
                gap: defaultTheme.spacing.lg,
                paddingBottom: defaultTheme.spacing.xl,
                overscrollBehaviorX: 'auto',
              }}
              ItemSeparatorComponent={() => <HStack width={defaultTheme.spacing['4xl']} />}
              renderItem={
                ({ item }) =>
                  (
                    <ProductCard {...item} />
                  )
              }
            />
          </HStack>
        </VStack>
      ))}
    </VStack>
  )
}
