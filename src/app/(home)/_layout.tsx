import { Slot } from 'expo-router'

import { Header } from '@/components/home/home-header'
import { VStack } from '@/components/ui/view'
import { defaultTheme } from '@/constants/theme'

export default function HomeLayout() {
  return (
    <VStack backgroundColor={defaultTheme.colors.gray[50]} flex={1}>
      <Header />
      <Slot />
    </VStack>
  )
}
