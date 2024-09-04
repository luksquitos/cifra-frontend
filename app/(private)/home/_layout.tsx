import { Slot } from 'expo-router'

import { Header } from '@/components/header/header'
import { Box } from '@/components/ui/box'

export default function Layout() {
  return (
    <Box className="flex-1">
      <Header />
      <Box className="flex-1 px-8 pt-9">
        <Slot />
      </Box>
    </Box>
  )
}
