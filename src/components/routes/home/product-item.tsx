import { TouchableOpacity } from 'react-native'

import { MagnifyingGlassCurrencyIcon } from '@/components/custom-icons'
import { ImageIcon } from '@/components/custom-icons/image-icon'
import { Center } from '@/components/ui/center'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'

interface CategoryItemProps {
  title: string
  price: string
  description: string
  cardAppend: string
}

export function ProductItem({
  title,
  description,
  price,
  cardAppend,
}: CategoryItemProps) {
  return (
    <TouchableOpacity className="mr-[16px] flex-1 rounded-lg border-2 border-gray-200">
      <VStack>
        <Center className="h-[163px] w-[220px] rounded-t-lg bg-gray-50">
          <ImageIcon className="text-typography-500" width={32} height={32} />
        </Center>
      </VStack>
      <VStack className="h-[120px] w-[220px] gap-3 border-t-2 border-t-gray-200 bg-gray-50 px-[12px] pt-[16px]">
        <Text className="font-interMedium text-typography-600">{title}</Text>
        <VStack>
          <Text className="font-interBold text-[18px]">{price}</Text>
          <Text className="text-[14px] leading-[16px] text-typography-400">
            {description}
          </Text>
        </VStack>
      </VStack>
      <HStack className="h-[36px] items-center justify-between rounded-b-lg bg-gray-200 px-[12px]">
        <Text>{cardAppend}</Text>
        <MagnifyingGlassCurrencyIcon className="text-typography-500" />
      </HStack>
    </TouchableOpacity>
  )
}
