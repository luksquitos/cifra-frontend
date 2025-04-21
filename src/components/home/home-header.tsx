import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft, faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { usePathname, useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Text } from '@/components/ui/text'
import { HStack } from '@/components/ui/view'

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
  const { top } = useSafeAreaInsets()

  return (
    <Animated.View
      style={[
        styleSheet.baseHeaderStyle,
        pathname === '/' ? styleSheet.homeHeaderStyle : styleSheet.searchHeaderStyle,
        { paddingTop: top + defaultTheme.spacing['4xl'] },
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
      <HStack width="100%" gap={defaultTheme.spacing['4xl']}>
        {pathname === '/search' && (
          <TouchableOpacity
            style={{ alignItems: 'center', justifyContent: 'center', height: 30, width: 30 }}
            onPress={() => {
              router.push('/')
            }}
          >
            <FontAwesomeIcon color={defaultTheme.colors.darkBlue[700]} icon={faChevronLeft} size={18} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: defaultTheme.colors.gray[0],
            borderRadius: defaultTheme.radius.xl,
            paddingHorizontal: defaultTheme.spacing['2xl'],
            paddingVertical: defaultTheme.spacing['3xl'],
            borderColor: defaultTheme.colors.primary.dark,
            alignItems: 'center',
            flexDirection: 'row',
            borderWidth: 1,
            gap: 8,
            flex: 1,
          }}
          onPress={() => pathname === '/' && router.push('/search')}

        >
          <FontAwesomeIcon icon={faMagnifyingGlass} color={styleSheet.magnifyingGlass.color} />
          <Text color={styleSheet.magnifyingGlass.color}>Procure por...</Text>
        </TouchableOpacity>
      </HStack>
    </Animated.View>
  )
}
