import { FlatList } from 'react-native'

import { useProductDetail } from '@/providers/product-detail-provider'
import { useTheme } from '@/providers/theme-provider'

import { HStack } from '../ui/view'
import { BuyOptionCard } from './product-detail-buy-option-card'

export function BuyOptions() {
  const { theme } = useTheme()
  const { whereToBuyList } = useProductDetail()

  return (

    <FlatList
      data={
        whereToBuyList.map((item, index) => (<BuyOptionCard bestPrice={index === 0} key={index} {...item} />))
      }
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: theme.spacing['8xl'] }}
      ItemSeparatorComponent={() => <HStack height={theme.spacing['8xl']} />}
      renderItem={({ item }) => item}
      style={{ marginHorizontal: theme.spacing['6xl'] }}
    />

  )
}
