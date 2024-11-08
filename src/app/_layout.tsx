import { Slot } from 'expo-router'

import { LayoutContent } from '@/components/routes/layout/layout-content'

export default function RootLayout() {
  return (
    <LayoutContent>
      <Slot />
    </LayoutContent>
  )
}
