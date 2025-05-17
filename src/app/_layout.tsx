import { faMap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Link, Slot } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { SessionProvider } from '@/providers/session-provider'

import { defaultTheme } from '../constants/theme'
import { ThemeProvider } from '../providers/theme-provider'

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
