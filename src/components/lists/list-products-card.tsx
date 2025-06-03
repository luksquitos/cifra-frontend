import fallback from '@/assets/images/tinta.png'
import { Image, TouchableOpacity } from 'react-native'

import type { EachProduct } from '@/@types/api/products'

import { defaultTheme } from '@/constants/theme'

import { Text } from '../ui/text'
import { HStack, VStack } from '../ui/view'
import { Button } from '../ui/button'

export function ProductCard({ name, image, price, id }: EachProduct) {

  return (
    <TouchableOpacity
      style={{
        width: 220,
        backgroundColor: defaultTheme.colors.gray[0],
        borderRadius: defaultTheme.radius.xl,
      }}
    >
      <HStack
        justifyContent="center"
        width="100%"
        height={160}
      >
        <Image source={image ? { uri: image, width: 120, height: 120 } : fallback} />
      </HStack>
      <VStack
        paddingHorizontal={defaultTheme.spacing['2xl']}
        height={120}
        paddingVertical={defaultTheme.spacing['4xl']}
        borderTopWidth={0.5}
        borderColor={defaultTheme.colors.gray[50]}
        width="100%"
        alignItems="stretch"
      >
        <Text fontWeight={500} fontSize={defaultTheme.font.size.sm}>{name}</Text>

        <VStack flex={1} />

        <Button
          variant="outlined"
          radius="md"
          style={{ borderColor: defaultTheme.colors.darkBlue[700] }}
        >
          <Text
            textAlign="center"
            color={defaultTheme.colors.darkBlue[700]}
          >
            + Adicionar
          </Text>
        </Button>
      </VStack>
    </TouchableOpacity>
  )
}
