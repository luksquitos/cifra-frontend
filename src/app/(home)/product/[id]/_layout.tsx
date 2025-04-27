import image from '@/assets/images/tinta.png'
import {} from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft, faSearch, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Slot, useRouter } from 'expo-router'
import { Image, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ProductDetailHero } from '@/components/product-detail/product-detail-hero'
import { Header } from '@/components/product-detail/products-detail-header'
import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { defaultTheme } from '@/constants/theme'

export default function ProductDetailLayout() {
  return (
    <VStack>
      <VStack marginHorizontal={defaultTheme.spacing['6xl']}>
        <Header />
        <ProductDetailHero />
      </VStack>
      <Slot />
    </VStack>
  )
}
