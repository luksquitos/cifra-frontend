import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useApp } from '@realm/react'
import { useState } from 'react'
import { Alert } from 'react-native'
import { Realm } from 'realm'

import { Button, ButtonText } from '@/components/ui/button'
import { Center } from '@/components/ui/center'
import { Image } from '@/components/ui/image'
import { Spinner } from '@/components/ui/spinner'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
})

export function Signin() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const app = useApp()

  async function handleGoogleSignin() {
    try {
      setIsAuthenticating(true)

      const { idToken } = await GoogleSignin.signIn()

      if (idToken) {
        const credentials = Realm.Credentials.jwt(idToken)

        await app.logIn(credentials)
      } else {
        Alert.alert(
          'Entrar',
          'Não foi possível conectar-se a sua conta Google.',
        )
      }
    } catch (error) {
      console.log(error)

      Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta Google.')
    } finally {
      setIsAuthenticating(false)
    }
  }
  return (
    <VStack className="flex-1">
      <Image
        className="w-full flex-1"
        source={require('../../../assets/login-bg.png')}
        alt="login-bg"
      />
      <Center className="bg-background-900/65 absolute size-full flex-1 gap-8">
        <Center>
          <Text className="font-robotoBold text-4xl font-bold text-primary-300">
            Ignite Fleet
          </Text>
          <Text className="text-lg text-typography-50">
            Gestão de uso de veículos
          </Text>
        </Center>
        <Button
          size="xl"
          className="rounded-md text-lg"
          style={{ height: 56, width: 324 }}
          onPress={handleGoogleSignin}
          disabled={isAuthenticating}
        >
          {isAuthenticating ? (
            <Spinner className="text-typography-50" size={'large'} />
          ) : (
            <ButtonText>Entrar com o Google</ButtonText>
          )}
        </Button>
      </Center>
    </VStack>
  )
}
