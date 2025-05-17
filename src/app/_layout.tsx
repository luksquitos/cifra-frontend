import { faMap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Link, Redirect, Slot, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { SessionProvider } from '@/providers/auth-provider'
import { QueryProvider } from '@/providers/query-provider'

import { defaultTheme } from '../constants/theme'
import { ThemeProvider, useTheme } from '../providers/theme-provider'

export default function RootLayout() {
  return (
    <SessionProvider>
      <SafeAreaProvider>
        <ThemeProvider theme={defaultTheme}>
          <Slot />
        </ThemeProvider>
      </SafeAreaProvider>
      <Link style={{ position: 'absolute', left: 0, bottom: 0 }} href="/_sitemap"><FontAwesomeIcon icon={faMap} /></Link>
    </SessionProvider>
  )
}
