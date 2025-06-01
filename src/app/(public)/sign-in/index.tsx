import type { TextInput } from 'react-native'

import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Link, useRouter } from 'expo-router'
import { useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Alert } from 'react-native'

import type { SignInPayload, SignInResponse } from '@/@types/api/sign-in'
import type { SignInSchemaType } from '@/validations/sign-in-schema'

import { Eye, LockIcon, MailIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { cifraApi } from '@/libs/cifra-api'
import { useSession } from '@/providers/session-provider'
import { useTheme } from '@/providers/theme-provider'
import { signInSchema } from '@/validations/sign-in-schema'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const { signIn, isLoadingSession } = useSession()
  const { theme } = useTheme()
  const router = useRouter()

  const signInMutation = useMutation({
    mutationFn: (data: SignInSchemaType) => signInApi(data),
    onSuccess: async (data) => {
      await signIn(data)
      router.replace('/(private)/(tabs)/(home)')
    },
    onError: () => {
      Alert.alert(
        'Erro ao fazer login',
        'Email e/ou senha inválidos. ',
      )
    },
  })

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: { onChange: signInSchema },
    onSubmit: async ({ value }) => {
      await signInMutation.mutateAsync(value)
    },
  })

  const passwordRef = useRef<TextInput>(null)

  const isLoading = useMemo(
    () => isLoadingSession || signInMutation.isPending,
    [isLoadingSession, signInMutation.isPending],
  )

  return (
    <VStack flex={1} justifyContent="center" alignItems="center" paddingHorizontal={theme.spacing['6xl']} backgroundColor={theme.colors.gray[0]}>
      <Text fontWeight={theme.font.weight.bold} fontSize={theme.font.size['3xl']}>
        Faça login
      </Text>

      <VStack gap={theme.spacing['6xl']} width="100%" marginTop={theme.spacing['3xl']}>
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
                <Text>Senha</Text>
                <Text color="red">*</Text>
              </HStack>
              <Input
                placeholder="Digite sua senha"
                ref={passwordRef}
                preppend={<LockIcon />}
                append={<Eye onPress={() => setShowPassword(value => !value)} />}
                value={field.state.value as never}
                onChangeText={field.handleChange}
                secureTextEntry={showPassword}
                returnKeyType="done"
              />
              {!field.state.meta.isValid && (
                <Text color="red">{field.state.meta.errors[0]?.message}</Text>
              )}
            </VStack>
          )}
        </form.Field>
        <Link href="/(public)/sign-up">Esqueci minha senha</Link>
        <Button
          disabled={isLoading}
          onPress={() => form.handleSubmit()}
          style={{ width: '100%', alignItems: 'center', paddingVertical: theme.spacing['3xl'] }}
          radius="lg"
          variant="secondary"
        >
          {isLoading ? <ActivityIndicator /> : <Text fontWeight={theme.font.weight.medium}>Entrar</Text>}
        </Button>
        <HStack gap={theme.spacing.xs} justifyContent="center" width="100%">
          <Text>
            Ainda não tem uma conta?
            {' '}
            <Text onPress={() => router.push('/(public)/sign-up')} style={{ color: theme.colors.darkBlue[700] }}>
              Cadastre-se
            </Text>
          </Text>
        </HStack>
      </VStack>
    </VStack>
  )
}

async function signInApi(input: SignInPayload) {
  const { data } = await cifraApi.post<SignInResponse>('/api/auth/token/', input)

  return data
}
