import fallback from '@/assets/images/tinta.png'
import { Image } from 'react-native'

import type { EachProduct } from '@/@types/api/products'

import { useTheme } from '@/providers/theme-provider'
import { currencyFormatter } from '@/utils/locale'

import { MapMarker } from '../icons'
import { Text } from '../ui/text'
import { HStack, VStack } from '../ui/view'

type BuyOptionCardProps = {
  bestPrice?: boolean
} & EachProduct

export function BuyOptionCard({ name, image, price, bestPrice }: BuyOptionCardProps) {
  const { theme } = useTheme()
  return (
    <VStack>
      <VStack>
        {bestPrice && (
          <HStack
            height={25}
            width={170}
            backgroundColor={theme.colors.yellow[300]}
            justifyContent="center"
            alignItems="center"
            borderTopLeftRadius={theme.spacing['2xl']}
            borderTopRightRadius={theme.spacing['2xl']}
          >
            <Text fontWeight={500} color={theme.colors.gray[600]}>Melhor local de compra</Text>
          </HStack>
        )}
        <HStack
          height={125}
          borderWidth={1}
          borderColor={bestPrice ? theme.colors.yellow[300] : theme.colors.gray[100]}
          width="100%"
          borderRadius={theme.spacing['2xl']}
          borderTopLeftRadius={bestPrice ? 0 : theme.spacing['2xl']}
          overflow="hidden"
        >
          <HStack backgroundColor={theme.colors.gray[25]} height="100%" width="32%" justifyContent="center" alignItems="center">

            <Image source={image ? { uri: image, width: 80, height: 80 } : fallback} />
          </HStack>
          <VStack flex={1} backgroundColor={theme.colors.gray[0]} height="100%" justifyContent="center" paddingLeft={theme.spacing['6xl']}>
            <VStack>
              <Text fontSize={theme.spacing['4xl']} fontWeight={500} color={theme.colors.gray[600]}>{name}</Text>
              <HStack>
                <MapMarker color={theme.colors.darkBlue[700]} size={12} />
                <Text color={theme.colors.darkBlue[700]}>
                  {' '}
                  Ver localização
                </Text>
              </HStack>
            </VStack>
            <Text fontSize={theme.spacing['4xl']} fontWeight={500} color={theme.colors.gray[600]}>
              {currencyFormatter(Number.parseFloat(price))}
            </Text>
            <Text fontSize={theme.spacing['2xl']} color={theme.colors.gray[400]}>
              ou até 12x de
              {' '}
              {currencyFormatter(66.50)}
            </Text>
          </VStack>
        </HStack>
      </VStack>
      {bestPrice && <HStack height={1} backgroundColor={theme.colors.gray[100]} width="100%" marginTop={theme.spacing['8xl']} />}
    </VStack>
  )
}
