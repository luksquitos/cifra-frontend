import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useGlobalSearchParams, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import type { CreateListSchemaType } from '@/validations/create-list-schema'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { cifraApi } from '@/libs/cifra-api'
import { useTheme } from '@/providers/theme-provider'
import { createListSchema } from '@/validations/create-list-schema'

import { getList } from './add-products'

async function renameList(id: string | number, input: Pick<CreateListSchemaType, 'name'>) {
  const { data } = await cifraApi.patch<{ id: number }>('/api/lists/{id}/', input, {
    routeParams: { id: String(id) },
  })
  return data
}

export default function ListRenamePage() {
  const params = useGlobalSearchParams<{ id: string }>()
  const router = useRouter()
  const { top } = useSafeAreaInsets()
  const { theme, setStatusBarStyle } = useTheme()
  const queryClient = useQueryClient()

  useEffect(() => {
    setStatusBarStyle('dark')
  }, [])

  const { data: list } = useQuery({
    queryKey: ['list-by-id', params.id],
    queryFn: () => getList(params.id),
  })
  const renameListMutation = useMutation({
    mutationFn: (data: CreateListSchemaType) => renameList(params.id, data),
    onSuccess: async ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ['lists'] })
      queryClient.invalidateQueries({ queryKey: ['list-by-id', String(id)] })
      router.replace({
        pathname: '/lists/[id]/manage',
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
      await renameListMutation.mutateAsync(value)
    },
  })

  useEffect(() => {
    if (!list) {
      return
    }
    form.setFieldValue('name', list.name || '')
  }, [list, form])

  return (
    <VStack flex={1} alignItems="stretch">
      <HStack
        backgroundColor={theme.colors.gray[0]}
        paddingTop={top + theme.spacing['2xl']}
        paddingBottom={theme.spacing['2xl']}
        width="100%"
        gap={theme.spacing['4xl']}
        justifyContent="space-between"
        paddingHorizontal={theme.spacing['6xl']}
      >
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: 'center', height: 30, width: 30 }}
          onPress={() => router.back()}
        >
          <FontAwesomeIcon color={theme.colors.darkBlue[700]} icon={faChevronLeft} size={18} />
        </TouchableOpacity>
        <Text
          flex={1}
          fontSize={theme.font.size.lg}
          fontWeight={500}
          color={theme.colors.gray[700]}
          textAlign="center"
        >
          Alterar nome da lista
        </Text>
      </HStack>

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
            disabled={renameListMutation.isPending}
            onPress={() => form.handleSubmit()}
            style={{ width: '100%', alignItems: 'center', paddingVertical: theme.spacing['3xl'] }}
            radius="lg"
            variant="secondary"
          >
            {renameListMutation.isPending ? <ActivityIndicator /> : <Text fontSize={theme.font.size.md} fontWeight={theme.font.weight.medium} color={theme.colors.gray[600]}>Salvar</Text>}
          </Button>
        </VStack>
      </VStack>
    </VStack>
  )
}
