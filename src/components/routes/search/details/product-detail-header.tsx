import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { ChevronLeft } from '@/utils/icons'

export function ProductHeader() {
  const insets = useSafeAreaInsets()
  const paddingTop = insets.top + 14
  const router = useRouter()

  return (
    <HStack style={{ paddingTop }}>
      <TouchableOpacity className="flex-row" onPress={() => router.back()}>
        <ChevronLeft className="text-primary-700" />
        <Text className="text-[16px] text-primary-700">Voltar</Text>
      </TouchableOpacity>
    </HStack>
  )
}
