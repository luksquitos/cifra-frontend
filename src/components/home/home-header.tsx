import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft, faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { usePathname, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'

import { Input } from '../../components/ui/input'
import { defaultTheme } from '../../constants/theme'

const styleSheet = StyleSheet.create({
  baseHeaderStyle: {
    padding: defaultTheme.spacing['6xl'],
    gap: defaultTheme.spacing['4xl'],
  },
  homeHeaderStyle: {
    backgroundColor: defaultTheme.colors.darkBlue[700],
    borderBottomLeftRadius: defaultTheme.radius['2xl'],
    borderBottomRightRadius: defaultTheme.radius['2xl'],
  },
  searchHeaderStyle: {},
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

export function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const translateY = useSharedValue(0)

  useEffect(() => {
    translateY.value = withTiming(pathname === '/search' ? -15 : 0, { duration: 300 })
  }, [pathname])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  return (
    <Animated.View
      style={[
        animatedStyle,
        styleSheet.baseHeaderStyle,
        pathname === '/' ? styleSheet.homeHeaderStyle : styleSheet.searchHeaderStyle,
      ]}
    >
      {pathname === '/' && (
        <HStack justifyContent="space-between" width="100%">
          <HStack gap={defaultTheme.spacing.lg} alignItems="center">
            <FontAwesomeIcon icon={faLocationDot} style={styleSheet.mapPinIcon} />
            <Text color={defaultTheme.colors.gray[0]}>Anápolis, GO - 75020000</Text>
          </HStack>
          <FontAwesomeIcon icon={faBell} style={styleSheet.bellIcon} />
        </HStack>
      )}
      <HStack width="100%">
        <TouchableOpacity onPress={() => router.back()}>
          {pathname === '/search' && <FontAwesomeIcon icon={faChevronLeft} />}
        </TouchableOpacity>
        <Input
          onPress={() => router.push('/search')}
          preppend={<FontAwesomeIcon icon={faMagnifyingGlass} color={styleSheet.magnifyingGlass.color} />}
          placeholder="Procure por..."
        />
      </HStack>
    </Animated.View>
  )
}
