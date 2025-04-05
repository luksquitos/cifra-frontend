import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { FlatList, StyleSheet, Touchable, TouchableOpacity } from 'react-native'

import { Categories } from '@/components/home/home-categories'
import { ProductCard } from '@/components/home/product-card'
import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { QueryProvider } from '@/providers/query-provider'

import { Input } from '../components/ui/input'
import { defaultTheme } from '../constants/theme'
import { ThemeProvider } from '../providers/theme-provider'
import { Products } from '@/components/home/home-products'

const styleSheet = StyleSheet.create({
  header: {
    backgroundColor: defaultTheme.colors.darkBlue[700],
    padding: defaultTheme.spacing['6xl'],
    gap: defaultTheme.spacing['4xl'],
    borderBottomLeftRadius: defaultTheme.radius['2xl'],
    borderBottomRightRadius: defaultTheme.radius['2xl'],
  },
  mapPinIcon: {
    color: defaultTheme.colors.yellow[300],
  },
  bellIcon: {
    color: defaultTheme.colors.gray[0],
  },
  text: {
    color: defaultTheme.colors.gray[0],
  },
  magnifyingGlass: {
    color: defaultTheme.colors.gray[300],
  },
})

export default function RootLayout() {
  return (
    <QueryProvider>
      <ThemeProvider theme={defaultTheme}>
        <VStack backgroundColor={defaultTheme.colors.gray[50]} flex={1}>
          <VStack style={styleSheet.header}>
            <HStack justifyContent="space-between" width="100%">
              <HStack gap={defaultTheme.spacing.lg} alignItems="center">
                <FontAwesomeIcon icon={faLocationDot} style={styleSheet.mapPinIcon} />
                <Text color={defaultTheme.colors.gray[0]}>Anápolis, GO - 75020000</Text>
              </HStack>
              <FontAwesomeIcon icon={faBell} style={styleSheet.bellIcon} />
            </HStack>
            <Input preppend={<FontAwesomeIcon icon={faMagnifyingGlass} color={styleSheet.magnifyingGlass.color} />} placeholder="Procure por..." />
          </VStack>
          <Categories />
          <Products />
        </VStack>
      </ThemeProvider>
    </QueryProvider>
  )
}
