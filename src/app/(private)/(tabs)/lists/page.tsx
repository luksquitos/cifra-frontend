import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ListIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/view'
import { useTheme } from '@/providers/theme-provider'

function ListEmpty() {
  const router = useRouter()
  const { theme } = useTheme()

  return (
    <VStack paddingHorizontal={20} alignItems="center" justifyContent="center">
      <ListIcon color={theme.colors.darkBlue[700]} style={{ marginBottom: theme.spacing['11xl'] }} />
      <Text fontWeight={theme.font.weight.bold} fontSize={theme.font.size.lg} textAlign="center" marginTop={theme.spacing['11xl']} color={theme.colors.gray[600]}>Você ainda não tem nenhuma lista</Text>
      <Text fontWeight={theme.font.weight.regular} fontSize={theme.font.size.md} textAlign="center" marginTop={theme.spacing['3xl']} marginBottom={theme.spacing['6xl']} color={theme.colors.gray[500]}>Crie uma lista com os materiais de sua escolha e compare o valor total entre as lojas.</Text>
      <Button
        onPress={() => router.push('/lists/create-lists')}
        style={{ width: '100%', alignItems: 'center', paddingVertical: theme.spacing['3xl'] }}
        radius="lg"
        variant="secondary"
      >
        <Text fontSize={theme.font.size.md} fontWeight={theme.font.weight.medium} color={theme.colors.gray[600]}>
          +
          {'  '}
          Criar lista
        </Text>
      </Button>
    </VStack>
  )
}

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
        <Text fontWeight={theme.font.weight.bold} fontSize={theme.font.size.xl}>Listas salvas</Text>
        <Text color={theme.colors.gray[400]} fontSize={theme.font.size.md}>Crie novas listas de materiais, compare valores entre diferentes lojas e gerencie as listas existentes.</Text>
      </VStack>
      <VStack flex={1} width="100%" alignItems="center" justifyContent="center" paddingHorizontal={theme.spacing['6xl']}>
        <ListEmpty />
      </VStack>
    </VStack>
  )
}
