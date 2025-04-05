import type { PropsWithChildren } from 'react'

import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Slot, Stack, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'

import { Categories } from '@/components/home/home-categories'
import { Header } from '@/components/home/home-header'
import { Products } from '@/components/home/home-products'
import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { QueryProvider } from '@/providers/query-provider'

import { Input } from '../components/ui/input'
import { defaultTheme } from '../constants/theme'
import { ThemeProvider } from '../providers/theme-provider'

export default function RootLayout() {
  return (
    <QueryProvider>
      <ThemeProvider theme={defaultTheme}>
        <Slot />
      </ThemeProvider>
    </QueryProvider>
  )
}
