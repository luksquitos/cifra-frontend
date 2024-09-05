import { Slot } from 'expo-router'

import { HomeHeader } from '@/components/routes/home/home-header'
import { Box } from '@/components/ui/box'

export default function Layout() {
  return (
    <Box className="flex-1">
      <HomeHeader />
      <Box className="flex-1 px-8 pt-9">
        <Slot />
      </Box>
    </Box>
  )
}
