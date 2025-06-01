import { Redirect, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { useSession } from '@/providers/session-provider'
import { useTheme } from '@/providers/theme-provider'

export default function PublicLayout() {
  const { statusBarStyle } = useTheme()

  const { session } = useSession()

  if (session) {
    return <Redirect href="/(private)/(tabs)/(home)" />
  }

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
