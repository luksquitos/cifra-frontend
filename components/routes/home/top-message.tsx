import { KeyRound } from 'lucide-react-native'
import { Center } from '@/components/ui/center'
import { Text } from '@/components/ui/text'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../tailwind.config'
import { useRouter } from 'expo-router'
import { Pressable, PressableStateProps } from '@/components/ui/pressable'
import { cn } from '@/utils/cn'
import { HStack } from '@/components/ui/hstack'

const fullConfig = resolveConfig(tailwindConfig)

export function TopMessage() {
  const router = useRouter()

  return (
    <Pressable
      onPress={() => {
        router.push('/departure')
      }}
    >
      {({ pressed }: PressableStateProps) => (
        <HStack
          className={cn(
            'h-[120] w-full flex-row items-center gap-3 rounded-lg bg-background-800 px-6',
            pressed && 'bg-background-600',
          )}
        >
          <Center className="size-[77] rounded-lg bg-background-700">
            <KeyRound
              size={52}
              fontWeight={'normal'}
              color={fullConfig.theme.colors.emerald['500']}
            />
          </Center>
          <Text className="max-w-[250] text-wrap font-semibold text-typography-100">
            Nenhum veículo em uso.{' '}
            <Text className="text-primary-300">
              Clique aqui para registrar a saída.{' '}
            </Text>
          </Text>
        </HStack>
      )}
    </Pressable>
  )
}
