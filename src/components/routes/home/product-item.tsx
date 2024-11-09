import { TouchableOpacity } from 'react-native'

import { Center } from '@/components/ui/center'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { GitCompareArrows, Image as ImageIcon } from '@/utils/icons'

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
    <TouchableOpacity className="mr-4 flex-1 rounded-lg border-2 border-gray-200">
      <VStack>
        <Center className="h-40 w-60 rounded-t-lg bg-gray-50">
          <ImageIcon className="size-8 text-typography-500" />
        </Center>
      </VStack>
      <VStack className="h-40 w-60 gap-3 border-t-2 border-t-gray-200 bg-gray-50 px-3">
        <Text className="font-interMedium text-typography-600">{title}</Text>
        <VStack>
          <Text className="font-interBold text-lg">{price}</Text>
          <Text className="leading-tight text-typography-400">
            {description}
          </Text>
        </VStack>
      </VStack>
      <HStack className="items-center justify-between rounded-b-lg bg-gray-200 px-4 py-2">
        <Text>{cardAppend}</Text>
        <GitCompareArrows className="text-typography-500" size={12} />
      </HStack>
    </TouchableOpacity>
  )
}
