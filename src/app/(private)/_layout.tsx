import { Redirect, Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { QueryProvider } from '@/providers/query-provider'
import { useSession } from '@/providers/session-provider'
import { useTheme } from '@/providers/theme-provider'

export default function PrivateLayout() {
  const { statusBarStyle } = useTheme()
  const { session } = useSession()

  if (!session) {
    return <Redirect href="/(public)/greetings" />
  }

  return (
    <>
      <StatusBar translucent style={statusBarStyle} />
      <QueryProvider>
        <Slot />
      </QueryProvider>
    </>
  )
}
