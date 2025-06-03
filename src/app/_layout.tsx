import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { QueryProvider } from '@/providers/query-provider'
import { SessionProvider } from '@/providers/session-provider'

import { defaultTheme } from '../constants/theme'
import { ThemeProvider } from '../providers/theme-provider'

// Mantém a splash screen visível enquanto inicializamos
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useEffect(() => {
    // Esconde a splash screen após a inicialização
    SplashScreen.hideAsync()
  }, [])

  return (
    <GestureHandlerRootView>
      <QueryProvider>
        <SessionProvider>
          <SafeAreaProvider>
            <ThemeProvider theme={defaultTheme}>
              <Slot />
            </ThemeProvider>
          </SafeAreaProvider>
        </SessionProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  )
}
