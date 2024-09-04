import { Slot, usePathname } from 'expo-router'

import '../global.css'
import { useWindowDimensions } from 'react-native'
import { LayoutContent } from '@/components/layout/layout-content'
import { useExpoRouter } from 'expo-router/build/global-state/router-store'
import { useEffect } from 'react'

export default function RootLayout() {
  return (
    <LayoutContent>
      <Slot />
    </LayoutContent>
  )
}
