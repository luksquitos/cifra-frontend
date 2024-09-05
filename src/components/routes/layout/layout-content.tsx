import 'react-native-get-random-values'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import { useWindowDimensions } from 'react-native'
import { type ReactNode, useEffect } from 'react'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'

import { AppProvider, UserProvider } from '@realm/react'
import { VStack } from '@/components/ui/vstack'
import { REALM_APP_ID } from '@env'
import { Signin } from '@/components/signin/signin'
import { RealmProvider } from '@/libs/realm'
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
    <AppProvider id={REALM_APP_ID}>
      <GluestackUIProvider mode="system">
        <SafeAreaProvider className="bg-background-800">
          <VStack className="flex-1" style={{ height }}>
            <RealmProvider>
              <UserProvider fallback={Signin}>{children}</UserProvider>
            </RealmProvider>
          </VStack>
        </SafeAreaProvider>
      </GluestackUIProvider>
    </AppProvider>
  )
}
