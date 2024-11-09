import { Image, TouchableOpacity } from 'react-native'

import { ImageIcon } from '@/components/custom-icons/image-icon'
import { Center } from '@/components/ui/center'
import { Text } from '@/components/ui/text'

interface CategoryItemProps {
  title: string
  imageSrc: any
}

export function CategoryItem({ title, imageSrc }: CategoryItemProps) {
  return (
    <TouchableOpacity className="mr-4 h-[70px] w-[190px] flex-row items-center gap-2 rounded-[6px] border-2 border-background-100">
      <Center className="h-full w-[70px] items-center justify-center bg-background-100">
        {imageSrc ? (
          <Image
            source={imageSrc}
            style={{
              width: '80%',
              height: '80%',
              resizeMode: 'contain',
              aspectRatio: 1,
            }}
            alt={title}
          />
        ) : (
          <ImageIcon className="text-typography-500" width={32} height={32} />
        )}
      </Center>
      <Text className="flex-1">{title}</Text>
    </TouchableOpacity>
  )
}
