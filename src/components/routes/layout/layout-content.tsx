import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import * as SplashScreen from 'expo-splash-screen'
import { type ReactNode, useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import '@/global.css'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'

import { VStack } from '@/components/ui/vstack'
import { cssInterop } from 'nativewind'

cssInterop(SafeAreaProvider, {
  className: {
    target: 'style',
  },
})

interface LayoutContentProps {
  children: ReactNode
}

SplashScreen.preventAutoHideAsync()

export function LayoutContent({ children }: LayoutContentProps) {
  const [loaded, error] = useFonts({
    robotoRegular: Roboto_400Regular,
    robotoBold: Roboto_700Bold,
    robotoMedium: Roboto_500Medium,
  })

  const { height } = useWindowDimensions()

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  return (
    <GluestackUIProvider mode="system">
      <SafeAreaProvider className="bg-background-800">
        <VStack className="flex-1" style={{ height }}>
          {children}
        </VStack>
      </SafeAreaProvider>
    </GluestackUIProvider>
  )
}
