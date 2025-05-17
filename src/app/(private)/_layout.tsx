import { faMap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Link, Redirect, Slot, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { useSession } from '@/providers/auth-provider'
import { QueryProvider } from '@/providers/query-provider'
import { useTheme } from '@/providers/theme-provider'

export default function PrivateLayout() {
  const { statusBarStyle } = useTheme()
  const { session } = useSession()

  //   if (!session) {
  //     return <Redirect href="/(public)/greetings" />
  //   }

  return (
    <>
      <StatusBar translucent style={statusBarStyle} />
      <QueryProvider>
        <Slot />
      </QueryProvider>
    </>
  )
}
