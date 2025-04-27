import type { LineChartPropsType } from 'react-native-gifted-charts'

import * as Tabs from '@rn-primitives/tabs'
import { useState } from 'react'
import { Dimensions, View } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'

import { TabsTrigger } from '@/components/ui/tabs'
import { Text } from '@/components/ui/text'
import { defaultTheme } from '@/constants/theme'

const screenWidth = Dimensions.get('window').width

export default function ProductDetail() {
  const [value, setValue] = useState('buy')
  const customLabel = (val) => {
    return (
      <View style={{ width: 70, marginLeft: 7 }}>
        <Text style={{ color: defaultTheme.colors.gray[400], fontWeight: 'bold' }}>{val}</Text>
      </View>
    )
  }

  const data: LineChartPropsType['data'] = [{ value: 50, labelComponent: () => customLabel('24 Nov') }, { value: 80 }, { value: 90 }, { value: 70 }]
  return (
    <Tabs.Root onValueChange={setValue} value={value}>

      <Tabs.List style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <TabsTrigger value="buy">Onde Comprar</TabsTrigger>
        <TabsTrigger value="history">Histórico</TabsTrigger>
        <TabsTrigger value="about">Sobre o Produto</TabsTrigger>
      </Tabs.List>
      <View style={{ backgroundColor: defaultTheme.colors.gray[50], flex: 1 }}>
        <Tabs.Content value="buy">
          <Text>Onde Comprar</Text>
        </Tabs.Content>
        <Tabs.Content value="history">
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
        </Tabs.Content>
        <Tabs.Content value="about">
          <Text>Sobre o Produto</Text>
        </Tabs.Content>
      </View>
    </Tabs.Root>
  )
}
