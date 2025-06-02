import fallback from '@/assets/images/tinta.png'
import { useRouter } from 'expo-router'
import { Image, TouchableOpacity } from 'react-native'

import type { EachProduct } from '@/@types/api/products'

import { useTheme } from '@/providers/theme-provider'

import { MagnifyingDollar } from '../icons'
import { Text } from '../ui/text'
import { HStack, VStack } from '../ui/view'

export function ProductCard({ name, image, price, id }: EachProduct) {
  const router = useRouter()
  const { theme } = useTheme()

  return (
    <TouchableOpacity
      onPress={() => router.push(`/product/${id}`)}
      style={{
        backgroundColor: theme.colors.gray[0],
        borderRadius: theme.radius.xl,
        flexBasis: '48%',
        marginBottom: theme.spacing['4xl'],
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
        paddingHorizontal={theme.spacing['2xl']}
        height={120}
        paddingVertical={theme.spacing['4xl']}
        borderTopWidth={0.5}
        borderColor={theme.colors.gray[50]}
        width="100%"
      >
        <Text fontWeight={500} fontSize={theme.font.size.sm}>{name}</Text>
        <VStack marginTop={theme.spacing['5xl']}>
          <Text fontSize={theme.font.size.md} fontWeight={700}>{Number.parseFloat(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
          <Text fontSize={theme.font.size.xs} color={theme.colors.gray[400]}>ou até 12x de R$ 66,50</Text>
        </VStack>
      </VStack>
      <HStack
        width="100%"
        justifyContent="space-between"
        paddingHorizontal={theme.spacing['2xl']}
        paddingVertical={theme.spacing['2xl']}
        backgroundColor={theme.colors.yellow[300]}
        borderBottomLeftRadius={theme.radius.xl}
        borderBottomRightRadius={theme.radius.xl}
      >
        <Text color={theme.colors.gray[600]}>Comparar preço</Text>
        <MagnifyingDollar size={theme.spacing['6xl']} color={theme.colors.gray[600]} />
      </HStack>
    </TouchableOpacity>
  )
}
