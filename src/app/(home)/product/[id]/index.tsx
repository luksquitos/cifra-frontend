import * as Tabs from '@rn-primitives/tabs'
import { useState } from 'react'
import { View } from 'react-native'

import { TabsTrigger } from '@/components/ui/tabs'
import { Text } from '@/components/ui/text'
import { defaultTheme } from '@/constants/theme'

export default function ProductDetail() {
  const [value, setValue] = useState('buy')
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
          <Text>Histórico</Text>
        </Tabs.Content>
        <Tabs.Content value="about">
          <Text>Sobre o Produto</Text>
        </Tabs.Content>
      </View>
    </Tabs.Root>
  )
}
