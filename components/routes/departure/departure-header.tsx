import { HStack } from '@/components/ui/hstack'
import { TouchableOpacity } from 'react-native'

import { ArrowLeft } from '@/utils/icons'
import { useRouter } from 'expo-router'
import { Text } from '@/components/ui/text'

export default function DepartureHeader() {
  const router = useRouter()

  return (
    <HStack className="h-20 items-center justify-between bg-background-800 px-6">
      <TouchableOpacity onPress={() => router.back()}>
        <ArrowLeft className="text-primary-300" size={32} />
      </TouchableOpacity>
      <Text className="font-robotoBold text-xl text-white">Saída</Text>
    </HStack>
  )
}
