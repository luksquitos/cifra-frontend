import { faChevronLeft, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@/providers/theme-provider'

import { Share } from '../icons'
import { HStack } from '../ui/view'

export function Header() {
  const { theme } = useTheme()
  const router = useRouter()
  const { top } = useSafeAreaInsets()

  return (
    <HStack marginTop={top} paddingVertical={theme.spacing.lg}>
      <TouchableOpacity onPress={() => router.back()} style={{ flex: 1 }}>
        <FontAwesomeIcon color={theme.colors.darkBlue[700]} size={18} icon={faChevronLeft} />
      </TouchableOpacity>
      <HStack gap={theme.spacing['5xl']}>
        <Share color={theme.colors.darkBlue[700]} size={18} />
        <TouchableOpacity onPress={() => router.push('/search')}>
          <FontAwesomeIcon color={theme.colors.darkBlue[700]} size={18} icon={faSearch} />
        </TouchableOpacity>
      </HStack>
    </HStack>
  )
}
