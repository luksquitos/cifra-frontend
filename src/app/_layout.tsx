import { Stack } from 'expo-router'

import { LayoutContent } from '@/components/routes/layout/layout-content'

export default function RootLayout() {
  return (
    <LayoutContent>
      <Stack screenOptions={{ navigationBarColor: 'transparent' }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </LayoutContent>
  )
}
