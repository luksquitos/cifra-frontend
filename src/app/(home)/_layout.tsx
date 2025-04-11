import { Slot, Stack, usePathname } from 'expo-router'

import { Header } from '@/components/home/home-header'
import { VStack } from '@/components/ui/view'
import { defaultTheme } from '@/constants/theme'

export default function HomeLayout() {
  return (

    <Stack screenOptions={{ headerShown: false }}>
      <Slot />
    </Stack>

  )
}
