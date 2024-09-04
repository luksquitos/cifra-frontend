import { Power } from '@/utils/icons'
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from '../../ui/avatar'
import { HStack } from '../../ui/hstack'
import { Text, TouchableOpacity } from 'react-native'
import { VStack } from '../../ui/vstack'
import { useAuth, useUser } from '@realm/react'

export function HomeHeader() {
  const { logOut } = useAuth()
  const user = useUser()

  console.log(user)

  return (
    <HStack className="h-[150] w-full items-center justify-between bg-background-800 p-8">
      <HStack className="gap-4">
        <Avatar size="lg" className="rounded-md">
          <AvatarFallbackText>Jane Doe</AvatarFallbackText>
          <AvatarImage
            className="rounded-md"
            source={{
              uri: user.profile.pictureUrl,
            }}
          />
          <AvatarBadge />
        </Avatar>
        <VStack>
          <Text className="text-xl font-normal text-white">Olá,</Text>
          <Text className="text-xl font-bold text-white">
            {user.profile.name}
          </Text>
        </VStack>
      </HStack>
      <TouchableOpacity onPress={logOut}>
        <Power className="text-white" size={32} />
      </TouchableOpacity>
    </HStack>
  )
}
