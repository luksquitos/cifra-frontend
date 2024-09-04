import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import { useWindowDimensions } from 'react-native'
import { type ReactNode, useEffect } from 'react'

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import '@/global.css'

import { AppProvider, UserProvider } from '@realm/react'
import { VStack } from '@/components/ui/vstack'
import { REALM_APP_ID } from '@env'
import { Signin } from '../../signin/signin'

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
        <SafeAreaView />
        <VStack className="bg-background-950" style={{ height }}>
          <UserProvider fallback={Signin}>{children}</UserProvider>
        </VStack>
      </GluestackUIProvider>
    </AppProvider>
  )
}
