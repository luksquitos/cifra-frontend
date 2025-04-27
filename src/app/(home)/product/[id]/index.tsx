import type { LineChartPropsType } from 'react-native-gifted-charts'

import * as Tabs from '@rn-primitives/tabs'
import { useState } from 'react'
import { Dimensions, View } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'

import { BuyOptions } from '@/components/product-detail/product-detail-buy-options'
import { TabsTrigger } from '@/components/ui/tabs'
import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { defaultTheme } from '@/constants/theme'
import { useTheme } from '@/providers/theme-provider'

const screenWidth = Dimensions.get('window').width

function customLabel(val) {
  return (
    <View style={{ width: 70, marginLeft: 7 }}>
      <Text style={{ color: defaultTheme.colors.gray[400], fontWeight: 'bold' }}>{val}</Text>
    </View>
  )
}

const data: LineChartPropsType['data'] = [{ value: 50, labelComponent: () => customLabel('24 Nov') }, { value: 80 }, { value: 90 }, { value: 70 }]

const tabs = [{
  label: 'Onde Comprar',
  value: 'buy',
  content: <BuyOptions />,
}, {
  label: 'Histórico',
  value: 'history',
  content: (
    <LineChart
      width={screenWidth}
      data={data}
      areaChart
      color="#2723D2"
      curved
      startFillColor="rgb(39,35,210)"
      startOpacity={0.4}
      endOpacity={0.04}
      endFillColor="rgb(23, 44, 46)"

    />
  ),
}, {
  label: 'Sobre o Produto',
  value: 'about',
  content: <Text>Sobre o Produto</Text>,
}]

export default function ProductDetail() {
  const [value, setValue] = useState('buy')
  const { theme } = useTheme()

  return (
    <Tabs.Root onValueChange={setValue} value={value}>
      <Tabs.List style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: theme.colors.gray[0] }}>
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </Tabs.List>
      {tabs.map(tab => (
        <Tabs.Content
          key={tab.value}
          value={tab.value}
          style={{ flex: 1, marginHorizontal: theme.spacing['6xl'] }}
        >
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
