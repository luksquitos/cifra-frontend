import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/view'
import { useTheme } from '@/providers/theme-provider'

export default function Lists() {
  const { theme } = useTheme()
  const { top } = useSafeAreaInsets()

  return (

    <VStack flex={1}>

      <VStack
        width="100%"
        paddingTop={top + 10}
        backgroundColor={theme.colors.gray[0]}
        paddingHorizontal={theme.spacing['6xl']}
        paddingBottom={theme.spacing['3xl']}
        gap={theme.spacing.lg}
      >
        <Text fontWeight={theme.font.weight.bold} fontSize={theme.font.size.xl}>Nova lista</Text>
        <Text color={theme.colors.gray[400]} fontSize={theme.font.size.md}>Crie sua nova lista de materiais para comparar os orçamentos entre diferentes lojas da sua região.</Text>
      </VStack>
      <VStack flex={1} width="100%" alignItems="stretch" justifyContent="center" paddingHorizontal={theme.spacing['6xl']}>
        <VStack flex={1}>
        </VStack>
        <VStack alignItems="stretch" paddingBottom={theme.spacing['6xl']}>
          <Button
            onPress={() => {}}
            style={{ width: '100%', alignItems: 'center', paddingVertical: theme.spacing['3xl'] }}
            radius="lg"
            variant="secondary"
          >
            <Text fontSize={theme.font.size.md} fontWeight={theme.font.weight.medium} color={theme.colors.gray[600]}>
              Continuar
            </Text>
          </Button>
        </VStack>
      </VStack>
    </VStack>
  )
}
