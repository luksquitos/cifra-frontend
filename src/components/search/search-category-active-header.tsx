import { faChevronLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import type { EachCategory } from '@/@types/api/categories'

import { cifraApi } from '@/libs/cifra-api'
import { useTheme } from '@/providers/theme-provider'

import { Text } from '../ui/text'
import { HStack } from '../ui/view'

export function CategoryActiveHeader({ id }: { id: string }) {
  const { theme, setStatusBarStyle } = useTheme()

  const router = useRouter()
  const { top } = useSafeAreaInsets()

  const query = useQuery({
    queryKey: ['retrive-category', id],
    queryFn: async () => {
      return await retrieveCategory(id)
    },
  })

  const category = query.data

  useEffect(() => {
    setStatusBarStyle('dark')
  }, [])

  return (
    <HStack backgroundColor={theme.colors.gray[0]} paddingTop={top + theme.spacing['2xl']} paddingBottom={theme.spacing['2xl']} width="100%" gap={theme.spacing['4xl']} justifyContent="space-between" paddingHorizontal={theme.spacing['6xl']}>

      <TouchableOpacity
        style={{ alignItems: 'center', justifyContent: 'center', height: 30, width: 30 }}
        onPress={() => {
          router.push('/')
        }}
      >
        <FontAwesomeIcon color={theme.colors.darkBlue[700]} icon={faChevronLeft} size={18} />
      </TouchableOpacity>
      <Text fontSize={theme.font.size.lg} fontWeight={500} color={theme.colors.gray[700]}>{category?.name}</Text>
      <TouchableOpacity
        style={{ alignItems: 'center', justifyContent: 'center', height: 30, width: 30 }}
        onPress={() => {
          router.push('/search')
        }}
      >
        <FontAwesomeIcon color={theme.colors.darkBlue[700]} icon={faMagnifyingGlass} size={18} />
      </TouchableOpacity>
    </HStack>
  )
}

async function retrieveCategory(id: string): Promise<EachCategory> {
  const { data } = await cifraApi.get('/api/stores/categories/{id}/', { routeParams: { id } })

  return data
}
