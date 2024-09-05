import { HStack } from '@/components/ui/hstack'
import { TouchableOpacity } from 'react-native'

import { ArrowLeft } from '@/utils/icons'
import { useRouter } from 'expo-router'
import { Text } from '@/components/ui/text'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function DepartureHeader() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top + 14

  return (
    <HStack
      className="items-center justify-between bg-background-800 px-6 pb-4"
      style={{ paddingTop }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <ArrowLeft className="text-primary-300" size={32} />
      </TouchableOpacity>
      <Text className="font-robotoBold text-xl text-white">Saída</Text>
    </HStack>
  )
}
