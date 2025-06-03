import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { ActivityIndicator, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import type { CreateListSchemaType } from '@/validations/create-list-schema'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { cifraApi } from '@/libs/cifra-api'
import { useTheme } from '@/providers/theme-provider'
import { createListSchema } from '@/validations/create-list-schema'

export default function CreateListPage() {
  const router = useRouter()
  const { theme } = useTheme()
  const { top } = useSafeAreaInsets()

  const createListMutation = useMutation({
    mutationFn: (data: CreateListSchemaType) => createList(data),
    onSuccess: async ({ id }) => {
      router.replace({
        pathname: '/(private)/(tabs)/lists/[id]/add-products',
        params: { id: String(id) },
      })
    },
    onError: () => {
      Alert.alert(
        'Erro ao criar lista',
        'Tente novamente mais tarde ou verifique os dados informados.',
      )
    },
  })

  const form = useForm({
    defaultValues: {
      name: '',
    },
    validators: { onChange: createListSchema },
    onSubmit: async ({ value }) => {
      await createListMutation.mutateAsync(value)
    },
  })

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
        <VStack flex={1} paddingTop={theme.spacing['6xl']}>
          <form.Field name="name">
            {field => (
              <VStack gap={theme.spacing.xs}>
                <HStack gap={4} alignItems="center">
                  <Text>Nome da lista</Text>
                  <Text color="red">*</Text>
                </HStack>
                <Input
                  placeholder="Ex: Reforma da cozinha"
                  value={field.state.value as never}
                  onChangeText={field.handleChange}
                />
                {!field.state.meta.isValid && (
                  <Text color="red">{field.state.meta.errors[0]?.message}</Text>
                )}
              </VStack>
            )}
          </form.Field>
        </VStack>
        <VStack alignItems="stretch" paddingBottom={theme.spacing['6xl']}>
          <Button
            disabled={createListMutation.isPending}
            onPress={() => form.handleSubmit()}
            style={{ width: '100%', alignItems: 'center', paddingVertical: theme.spacing['3xl'] }}
            radius="lg"
            variant="secondary"
          >
            {createListMutation.isPending ? <ActivityIndicator /> : <Text fontSize={theme.font.size.md} fontWeight={theme.font.weight.medium} color={theme.colors.gray[600]}>Continuar</Text>}
          </Button>
        </VStack>
      </VStack>
    </VStack>
  )
}

async function createList(input: CreateListSchemaType) {
  const { data } = await cifraApi.post<{ id: number }>('/api/lists/', input)
  return data
}
