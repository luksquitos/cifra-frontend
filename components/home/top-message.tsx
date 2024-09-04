import { HStack } from '@/components/ui/hstack'
import { KeyRound } from 'lucide-react-native'
import { Center } from '@/components/ui/center'
import { Text } from '@/components/ui/text'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config'

const fullConfig = resolveConfig(tailwindConfig)

export function TopMessage() {
  return (
    <HStack className="h-[120] w-full items-center gap-3 rounded-lg bg-background-800 px-6">
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
  )
}
