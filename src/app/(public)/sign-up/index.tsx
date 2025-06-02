import type { TextInput } from 'react-native'

import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import type { SignUpPayload } from '@/@types/api/sign-up'
import type { SignUpSchemaType } from '@/validations/sign-up-schema'

import { Eye, LockIcon, MailIcon, User2Icon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { cifraApi } from '@/libs/cifra-api'
import { useSession } from '@/providers/session-provider'
import { useTheme } from '@/providers/theme-provider'
import { signUpSchema } from '@/validations/sign-up-schema'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const { isLoadingSession } = useSession()
  const { theme } = useTheme()
  const router = useRouter()

  const signUpMutation = useMutation({
    mutationFn: (data: SignUpSchemaType) => signUp(data),
    onSuccess: async () => {
      router.replace('/(public)/sign-in')
    },
    onError: () => {
      Alert.alert(
        'Erro ao criar usuario',
        'Tente novamente mais tarde ou verifique os dados informados.',
      )
    },
  })

  const { top } = useSafeAreaInsets()

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: { onChange: signUpSchema },
    onSubmit: async ({ value }) => {
      await signUpMutation.mutateAsync(value)
    },
  })

  const passwordRef = useRef<TextInput>(null)

  const isLoading = useMemo(
    () => isLoadingSession || signUpMutation.isPending,
    [isLoadingSession, signUpMutation.isPending],
  )

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
        <Text fontWeight={theme.font.weight.bold} fontSize={theme.font.size.xl}>Cadastre-se</Text>
        <Text color={theme.colors.gray[400]} fontSize={theme.font.size.md}> Crie uma conta para começar</Text>
      </VStack>
      <VStack flex={1} width="100%" alignItems="center" paddingHorizontal={theme.spacing['6xl']}>

        <VStack gap={theme.spacing['6xl']} width="100%" marginTop={theme.spacing['3xl']}>
          <form.Field name="name">
            {field => (
              <VStack gap={theme.spacing.xs}>
                <HStack gap={4} alignItems="center">
                  <Text>Nome</Text>
                  <Text color="red">*</Text>
                </HStack>
                <Input
                  placeholder="Digite seu nome"
                  preppend={<User2Icon />}
                  value={field.state.value as never}
                  onChangeText={field.handleChange}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
                {!field.state.meta.isValid && (
                  <Text color="red">{field.state.meta.errors[0]?.message}</Text>
                )}
              </VStack>
            )}
          </form.Field>
          <form.Field name="email">
            {field => (
              <VStack gap={theme.spacing.xs}>
                <HStack gap={4} alignItems="center">
                  <Text>E-mail</Text>
                  <Text color="red">*</Text>
                </HStack>
                <Input
                  placeholder="Digite seu email"
                  preppend={<MailIcon />}
                  value={field.state.value as never}
                  onChangeText={field.handleChange}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
                {!field.state.meta.isValid && (
                  <Text color="red">{field.state.meta.errors[0]?.message}</Text>
                )}
              </VStack>
            )}
          </form.Field>

          <form.Field name="password">
            {field => (
              <VStack>
                <HStack gap={4} alignItems="center">
                  <Text>Crie um senha</Text>
                  <Text color="red">*</Text>
                </HStack>
                <Input
                  placeholder="Digite sua senha"
                  ref={passwordRef}
                  preppend={<LockIcon />}
                  append={<Eye onPress={() => setShowPassword(value => !value)} />}
                  value={field.state.value as never}
                  onChangeText={field.handleChange}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                />
                {!field.state.meta.isValid && (
                  <Text color="red">{field.state.meta.errors[0]?.message}</Text>
                )}
              </VStack>
            )}
          </form.Field>
          <form.Field name="confirmPassword">
            {field => (
              <VStack>
                <HStack gap={4} alignItems="center">
                  <Text>Confirme sua senha</Text>
                  <Text color="red">*</Text>
                </HStack>
                <Input
                  placeholder="Digite sua senha"
                  ref={passwordRef}
                  preppend={<LockIcon />}
                  append={<Eye onPress={() => setShowPasswordConfirm(value => !value)} />}
                  value={field.state.value as never}
                  onChangeText={field.handleChange}
                  secureTextEntry={!showPasswordConfirm}
                  returnKeyType="done"
                />
                {!field.state.meta.isValid && (
                  <Text color="red">{field.state.meta.errors[0]?.message}</Text>
                )}
              </VStack>
            )}
          </form.Field>
          <Button
            disabled={isLoading}
            onPress={() => form.handleSubmit()}
            style={{ width: '100%', alignItems: 'center', paddingVertical: theme.spacing['3xl'] }}
            radius="lg"
            variant="secondary"
          >
            {isLoading ? <ActivityIndicator /> : <Text fontWeight={theme.font.weight.medium}>Criar</Text>}
          </Button>

        </VStack>
      </VStack>
    </VStack>
  )
}

async function signUp(input: SignUpSchemaType) {
  const { data } = await cifraApi.post<any, SignUpPayload>('/api/users/', {
    name: input.name,
    email: input.email,
    confirm_password: input.confirmPassword,
    password: input.password,
  } as SignUpPayload)

  return data
}
