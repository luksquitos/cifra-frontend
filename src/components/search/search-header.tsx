import type { TextInput } from 'react-native'
import type { DebouncedState } from 'usehooks-ts'

import { faChevronLeft, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { usePathname, useRouter } from 'expo-router'
import { useSearchParams } from 'expo-router/build/hooks'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated, {
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { HStack } from '@/components/ui/view'
import { defaultTheme } from '@/constants/theme'

import { Input } from '../ui/input'
import { CategoryActiveHeader } from './search-category-active-header'

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

export function Header({ search, setSearch }: { search: string, setSearch: DebouncedState<(value: string) => void> }) {
  const router = useRouter()
  const pathname = usePathname()
  const { top } = useSafeAreaInsets()
  const [displaySearch, setDisplaySearch] = useState('')
  const params = useSearchParams()

  const category = params.get('category') || ''

  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    category
      ? <CategoryActiveHeader id={category} />
      : (
          <Animated.View
            style={[
              styleSheet.baseHeaderStyle,
              pathname === '/' ? styleSheet.homeHeaderStyle : styleSheet.searchHeaderStyle,
              { paddingTop: top + defaultTheme.spacing['4xl'] },
            ]}
          >
            <HStack width="100%" gap={defaultTheme.spacing['4xl']}>
              {pathname === '/search' && (
                <TouchableOpacity
                  style={{ alignItems: 'center', justifyContent: 'center', height: 30, width: 30 }}
                  onPress={() => {
                    inputRef.current?.blur()
                    setSearch('')
                    setDisplaySearch('')
                    router.push('/')
                  }}
                >
                  <FontAwesomeIcon color={defaultTheme.colors.darkBlue[700]} icon={faChevronLeft} size={18} />
                </TouchableOpacity>
              )}
              <Input
                value={displaySearch}
                ref={inputRef}
                onChangeText={(e) => {
                  setSearch(e)
                  setDisplaySearch(e)
                }}
                append={search.length > 0
                  ? (
                      <TouchableOpacity onPress={() => {
                        setDisplaySearch('')
                        setSearch('')
                      }}
                      >
                        <FontAwesomeIcon
                          icon={faXmark}
                          color={defaultTheme.colors.gray[500]}
                        />
                      </TouchableOpacity>
                    )
                  : null}
                onPress={() => pathname === '/' && router.push('/search')}
                preppend={<FontAwesomeIcon icon={faMagnifyingGlass} color={styleSheet.magnifyingGlass.color} />}
                placeholder="Procure por..."
              />
            </HStack>
          </Animated.View>
        )
  )
}
