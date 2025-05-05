import fallback from '@/assets/images/tinta.png'
import { Image } from 'react-native'

import { useProductDetail } from '@/providers/product-detail-provider'
import { useTheme } from '@/providers/theme-provider'

import { Text } from '../ui/text'
import { HStack, VStack } from '../ui/view'

export function ProductDetailHero() {
  const { theme } = useTheme()
  const { productData } = useProductDetail()

  return (
    <VStack gap={theme.spacing['8xl']} width="100%">
      <HStack
        marginTop={theme.spacing['6xl']}
        justifyContent="center"
        width="100%"
        backgroundColor={theme.colors.gray[25]}
        paddingVertical={theme.spacing['4xl']}
        borderRadius={theme.radius.xl}
      >
        <Image source={productData?.image ? { uri: productData.image, width: 120, height: 120 } : fallback} />
      </HStack>
      <Text
        marginVertical={theme.spacing['8xl']}
        color={theme.colors.gray[600]}
        fontSize={theme.font.size.xl}
        fontWeight={700}
      >
        {productData?.name}
      </Text>
    </VStack>
  )
}
