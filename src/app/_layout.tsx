import { faMap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Link, Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { QueryProvider } from '@/providers/query-provider'

import { defaultTheme } from '../constants/theme'
import { ThemeProvider, useTheme } from '../providers/theme-provider'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={defaultTheme}>
        <LayoutContent />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

function LayoutContent() {
  const { statusBarStyle } = useTheme()
  return (
    <>
      <StatusBar translucent style={statusBarStyle} />
      <QueryProvider>
        <Slot />
        <Link style={{ position: 'absolute', left: 0, bottom: 0 }} href="/_sitemap"><FontAwesomeIcon icon={faMap} /></Link>
      </QueryProvider>
    </>
  )
}
