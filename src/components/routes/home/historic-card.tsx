import { History } from 'lucide-react-native'
import { HStack } from '../../ui/hstack'
import { Text } from '../../ui/text/index'
import { VStack } from '../../ui/vstack'
import { Pressable } from '../../ui/pressable'
import { cn } from '@/utils/cn'
import { useRouter } from 'expo-router'

interface HistoricCardProps {
  title: string
  message: string
}

export function HistoricCard({ title, message }: HistoricCardProps) {
  const router = useRouter()

  return (
    <Pressable onPress={() => router.push('/vehicle')}>
      <HStack
        className={cn(
          'h-[82] w-full items-center justify-between rounded-lg bg-background-700 px-4',
        )}
      >
        <VStack>
          <Text className="text-xl font-bold text-typography-100">{title}</Text>
          <Text className="text-lg text-typography-100">{message}</Text>
        </VStack>
        <History color={'gray'} />
      </HStack>
    </Pressable>
  )
}
