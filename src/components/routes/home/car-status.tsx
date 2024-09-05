import { Center } from '@/components/ui/center'
import { Text } from '@/components/ui/text'
import { useRouter } from 'expo-router'
import { Pressable, PressableStateProps } from '@/components/ui/pressable'
import { cn } from '@/utils/cn'
import { HStack } from '@/components/ui/hstack'
import { CarFront, KeyRound } from '@/utils/icons'

interface CarStatusProps {
  licensePlate?: string
}

export function CarStatus({ licensePlate }: CarStatusProps) {
  const router = useRouter()

  const Icon = licensePlate ? KeyRound : CarFront
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso. `
    : 'Nenhum veículo em uso. '
  const status = licensePlate ? 'chegada' : 'saída'

  return (
    <Pressable
      onPress={() => {
        router.push('/departure')
      }}
    >
      {({ pressed }: PressableStateProps) => (
        <HStack
          className={cn(
            'h-[120] w-full flex-row items-center gap-3 rounded-lg bg-background-700 px-6',
            pressed && 'bg-background-600',
          )}
        >
          <Center className="size-[77] rounded-lg bg-background-700">
            <Icon
              className="text-primary-300"
              size={52}
              fontWeight={'normal'}
            />
          </Center>
          <Text className="flex-1 font-semibold text-typography-100">
            {message}
            <Text className="text-primary-300">
              Clique aqui para registrar a {status}.{' '}
            </Text>
          </Text>
        </HStack>
      )}
    </Pressable>
  )
}
