import * as Tabs from '@rn-primitives/tabs'
import { useState } from 'react'

import { About } from '@/components/product-detail/product-detail-about'
import { BuyOptions } from '@/components/product-detail/product-detail-buy-options'
import { History } from '@/components/product-detail/product-detail-history'
import { TabsTrigger } from '@/components/ui/tabs'
import { Text } from '@/components/ui/text'
import { useTheme } from '@/providers/theme-provider'

const tabs = [{
  label: 'Onde Comprar',
  value: 'buy',
  content: <BuyOptions />,
}, {
  label: 'Histórico',
  value: 'history',
  content: (
    <History />
  ),
}, {
  label: 'Sobre o Produto',
  value: 'about',
  content: <About />,
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
          style={{ flex: 1 }}
        >
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
