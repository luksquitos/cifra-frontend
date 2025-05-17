import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { useTheme } from '@/providers/theme-provider'

export default function PublicLayout() {
  const { statusBarStyle } = useTheme()
  return (
    <>
      <StatusBar translucent style={statusBarStyle} />
      <Stack screenOptions={{
        headerShown: false,
      }}
      />
    </>

  )
}
