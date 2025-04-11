import { faMap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Link, Slot, usePathname } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { QueryProvider } from '@/providers/query-provider'

import { defaultTheme } from '../constants/theme'
import { ThemeProvider } from '../providers/theme-provider'

export default function RootLayout() {
  const pathname = usePathname()
  console.log('pathname', pathname)
  return (
    <SafeAreaProvider>
      <StatusBar translucent style="inverted" />
      <QueryProvider>
        <ThemeProvider theme={defaultTheme}>
          <Slot />
        </ThemeProvider>
        <Link style={{ position: 'absolute', left: 0, bottom: 0 }} href="/_sitemap"><FontAwesomeIcon icon={faMap} /></Link>
      </QueryProvider>
    </SafeAreaProvider>
  )
}
