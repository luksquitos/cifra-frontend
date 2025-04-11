import image from '@/assets/images/tinta.png'
import {} from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft, faSearch, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Slot, useRouter } from 'expo-router'
import { Image, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { defaultTheme } from '@/constants/theme'

export default function ProductDetailLayout() {
  const { top } = useSafeAreaInsets()
  const router = useRouter()

  return (
    <VStack>
      <VStack marginHorizontal={defaultTheme.spacing['6xl']}>
        <HStack marginTop={top}>
          <TouchableOpacity onPress={() => router.back()} style={{ flex: 1 }}>
            <FontAwesomeIcon color={defaultTheme.colors.darkBlue[700]} size={18} icon={faChevronLeft} />
          </TouchableOpacity>
          <HStack gap={defaultTheme.spacing['5xl']}>
            <FontAwesomeIcon color={defaultTheme.colors.darkBlue[700]} size={18} icon={faShareAlt} />
            <FontAwesomeIcon color={defaultTheme.colors.darkBlue[700]} size={18} icon={faSearch} />
          </HStack>
        </HStack>
        <VStack gap={defaultTheme.spacing['8xl']}>
          <HStack
            marginTop={defaultTheme.spacing['6xl']}
            justifyContent="center"
            width="100%"
            backgroundColor={defaultTheme.colors.gray[25]}
            paddingVertical={defaultTheme.spacing['4xl']}
            borderRadius={defaultTheme.radius.xl}
          >
            <Image height={130} source={image} />
          </HStack>
          <Text
            marginVertical={defaultTheme.spacing['8xl']}
            color={defaultTheme.colors.gray[600]}
            fontSize={defaultTheme.font.size.xl}
            fontWeight={700}
          >
            Tinta Borracha Liquida Solução Total
          </Text>
        </VStack>
      </VStack>
      <Slot />
    </VStack>
  )
}
