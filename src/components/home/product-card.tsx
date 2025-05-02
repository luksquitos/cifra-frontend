import fallback from '@/assets/images/tinta.png'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useRouter } from 'expo-router'
import { Image, TouchableOpacity } from 'react-native'

import type { EachProduct } from '@/@types/api/products'

import { defaultTheme } from '@/constants/theme'

import { Text } from '../ui/text'
import { HStack, VStack } from '../ui/view'

export function ProductCard({ name, image, price, id }: EachProduct) {
  const router = useRouter()

  return (
    <TouchableOpacity
      onPress={() => router.push(`/product/${id}`)}
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
      >
        <Text fontWeight={500} fontSize={defaultTheme.font.size.sm}>{name}</Text>
        <VStack marginTop={defaultTheme.spacing['5xl']}>
          <Text fontSize={defaultTheme.font.size.md} fontWeight={700}>{Number.parseFloat(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
          <Text fontSize={defaultTheme.font.size.xs} color={defaultTheme.colors.gray[400]}>ou até 12x de R$ 66,50</Text>
        </VStack>
      </VStack>
      <HStack
        width="100%"
        justifyContent="space-between"
        paddingHorizontal={defaultTheme.spacing['2xl']}
        paddingVertical={defaultTheme.spacing['2xl']}
        backgroundColor={defaultTheme.colors.yellow[300]}
        borderBottomLeftRadius={defaultTheme.radius.xl}
        borderBottomRightRadius={defaultTheme.radius.xl}
      >
        <Text>Comparar preço</Text>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </HStack>
    </TouchableOpacity>
  )
}
