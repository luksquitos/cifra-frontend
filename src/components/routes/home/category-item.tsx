import { TouchableOpacity } from 'react-native'

import { ImageIcon } from '@/components/custom-icons/image-icon'
import { Center } from '@/components/ui/center'
import { Text } from '@/components/ui/text'

interface CategoryItemProps {
  title: string
}

export function CategoryItem({ title }: CategoryItemProps) {
  return (
    <TouchableOpacity className="mr-4 h-[70px] w-[190px] flex-row items-center gap-2 rounded-lg border-2 border-background-200">
      <Center className="h-full w-[70px] bg-background-200">
        <ImageIcon className="text-typography-500" width={32} height={32} />
      </Center>
      <Text className="flex-1">{title}</Text>
    </TouchableOpacity>
  )
}
