import { Camera, Power } from 'lucide-react-native'
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from '../ui/avatar'
import { HStack } from '../ui/hstack'
import { AddIcon, Icon } from '../ui/icon'
import { Text } from 'react-native'
import { VStack } from '../ui/vstack'

export function Header() {
  return (
    <HStack className="h-[150] w-full items-center justify-between bg-background-800 p-8">
      <HStack className="gap-4">
        <Avatar size="lg" className="rounded-md">
          <AvatarFallbackText>Jane Doe</AvatarFallbackText>
          <AvatarImage
            className="rounded-md"
            source={{
              uri: 'https://github.com/AndreSerafin.png',
            }}
          />
          <AvatarBadge />
        </Avatar>
        <VStack>
          <Text className="text-xl font-normal text-white">Olá,</Text>
          <Text className="text-xl font-bold text-white">User</Text>
        </VStack>
      </HStack>
      <Power color={'white'} size={32} />
    </HStack>
  )
}
