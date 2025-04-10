import type { TextInput } from 'react-native'

import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft, faLocationDot, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { usePathname, useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDebounceCallback } from 'usehooks-ts'

import { Text } from '@/components/ui/text'
import { HStack } from '@/components/ui/view'

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
  const [search, setSearch] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const { top } = useSafeAreaInsets()

  const translateY = useSharedValue(0)
  const inputRef = useRef<TextInput>(null)

  const debouncedSearch = useDebounceCallback((value: string) => {
    setSearchParams(value)
  })

  useEffect(() => {
    translateY.value = withTiming(pathname === '/search' ? -15 : 0, { duration: 300 })
  }, [pathname])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  function setSearchParams(value: string) {
    const params = new URLSearchParams(pathname)
    params.append('search', value)

    router.push(`/search?${params.toString()}`)
  }

  return (
    <Animated.View
      style={[
        animatedStyle,
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
              inputRef.current?.blur()
              router.push('/')
            }}
          >
            <FontAwesomeIcon color={defaultTheme.colors.darkBlue[700]} icon={faChevronLeft} size={18} />
          </TouchableOpacity>
        )}
        <Input
          value={search}
          ref={inputRef}
          onChangeText={(e) => {
            setSearch(e)
            debouncedSearch(e)
          }}
          append={search.length > 0
            ? (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    color={defaultTheme.colors.gray[500]}
                  />
                </TouchableOpacity>
              )
            : null}
          onPress={() => router.push('/search')}
          preppend={<FontAwesomeIcon icon={faMagnifyingGlass} color={styleSheet.magnifyingGlass.color} />}
          placeholder="Procure por..."
        />
      </HStack>
    </Animated.View>
  )
}
