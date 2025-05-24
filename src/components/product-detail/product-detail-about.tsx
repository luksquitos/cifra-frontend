import { useMemo } from 'react'
import { FlatList } from 'react-native'

import { useProductDetail } from '@/providers/product-detail-provider'
import { useTheme } from '@/providers/theme-provider'

import { Text } from '../ui/text'
import { VStack } from '../ui/view'

export function About() {
  const { productCharacteristicsData } = useProductDetail()
  const { theme } = useTheme()

  const data = useMemo(() => productCharacteristicsData?.results ?? [], [productCharacteristicsData])

  return (
    <VStack flex={1}>
      <FlatList
        style={{ flex: 1, width: '100%', marginHorizontal: theme.spacing.lg, marginVertical: theme.spacing['4xl'] }}
        data={data}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <VStack justifyContent="center" height={58} backgroundColor={index % 2 === 0 ? theme.colors.gray[0] : theme.colors.gray[50]} padding={theme.spacing['4xl']}>
            <Text fontWeight={700}>{item.key}</Text>
            <Text>{item.value}</Text>
          </VStack>
        )}
      />
    </VStack>
  )
}
