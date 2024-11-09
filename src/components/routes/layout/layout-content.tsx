import '@/global.css'

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter'
import * as SplashScreen from 'expo-splash-screen'
import { cssInterop } from 'nativewind'
import { type ReactNode, useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { VStack } from '@/components/ui/vstack'

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
    interRegular: Inter_400Regular,
    interBold: Inter_700Bold,
    interMedium: Inter_500Medium,
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
    <GluestackUIProvider mode="light">
      <SafeAreaProvider className="bg-background-100">
        <VStack className="flex-1" style={{ height }}>
          {children}
        </VStack>
      </SafeAreaProvider>
    </GluestackUIProvider>
  )
}
