import { TouchableOpacity } from 'react-native'

import { Center } from '@/components/ui/center'
import { Text } from '@/components/ui/text'
import { Image as ImageIcon } from '@/utils/icons'

interface CategoryItemProps {
  title: string
}

export function CategoryItem({ title }: CategoryItemProps) {
  return (
    <TouchableOpacity className="mr-4 h-16 w-52 flex-row items-center gap-1 rounded-lg border-2 border-background-200">
      <Center className="h-full w-16 bg-background-200">
        <ImageIcon className="text-typography-500" />
      </Center>
      <Text className="flex-1">{title}</Text>
    </TouchableOpacity>
  )
}
