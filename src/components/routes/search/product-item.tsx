import { useRouter } from 'expo-router'
import { Image, TouchableOpacity } from 'react-native'

import {
  ImageIcon,
  MagnifyingGlassCurrencyIcon,
} from '@/components/custom-icons'
import { Center } from '@/components/ui/center'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { PrivateRoutes } from '@/constants/routes/private-routes-enum'

interface CategoryItemProps {
  id: string
  title: string
  price: string
  description: string
  cardAppend: string
  imageSrc: any
}

export function ProductItem({
  id,
  title,
  description,
  price,
  cardAppend,
  imageSrc,
}: CategoryItemProps) {
  const router = useRouter()

  return (
    <TouchableOpacity
      className="mr-[16px] flex-1 rounded-[6px] border-2 border-background-100"
      onPress={() => router.push(`${PrivateRoutes.SEARCH}/${id}`)}
    >
      <VStack>
        <Center className="h-[163px] w-[220px] rounded-t-[6px] bg-background-50">
          {imageSrc ? (
            <Image
              source={imageSrc}
              style={{
                width: '80%',
                height: '80%',
                resizeMode: 'contain',
                borderRadius: 8,
              }}
              alt={title}
            />
          ) : (
            <ImageIcon className="text-typography-500" width={32} height={32} />
          )}
        </Center>
      </VStack>
      <VStack className="h-[120px] w-[220px] gap-3 border-t-2 border-t-background-100 bg-background-50 px-[12px] pt-[16px]">
        <Text className="font-interMedium text-typography-600">{title}</Text>
        <VStack>
          <Text className="font-interBold text-[18px]">{price}</Text>
          <Text className="text-[14px] leading-[16px] text-typography-400">
            {description}
          </Text>
        </VStack>
      </VStack>
      <HStack className="h-[36px] items-center justify-between rounded-b-[6px] bg-background-100 px-[12px]">
        <Text>{cardAppend}</Text>
        <MagnifyingGlassCurrencyIcon className="stroke-primary-500" />
      </HStack>
    </TouchableOpacity>
  )
}
