import { TextArea, TextAreaInput, TextAreaLabel } from '@/components/text-area'
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button'
import { VStack } from '@/components/ui/vstack'
import { licensePlateValidate } from '@/utils/liscense-plate-validate'
import { useRealm } from '@/libs/realm'
import { useRef, useState } from 'react'
import { Alert, TextInput } from 'react-native'
import { Historic } from '@/libs/realm/schemas/historic'
import { useUser } from '@realm/react'
import { useRouter } from 'expo-router'

export function DepartureForm() {
  const [licensePlate, setLicensePlate] = useState<string>('')

  const [description, setDescription] = useState<string>('')
  const descriptionRef = useRef<TextInput>(null)
  const licensePlateRef = useRef<TextInput>(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const realm = useRealm()
  const user = useUser()
  const router = useRouter()

  function handleDepartureRegister() {
    try {
      if (!licensePlateValidate(licensePlate)) {
        return Alert.alert(
          'Placa inválida',
          'A placa é inválida. Por favor, informe a placa correta.',
          [{ text: 'Ok', onPress: () => licensePlateRef.current?.focus() }],
        )
      }

      if (description.trim().length === 0) {
        return Alert.alert(
          'Finalidade',
          'Por favor, informe a finalidade da utilização do veículo',
          [{ text: 'Ok', onPress: () => descriptionRef.current?.focus() }],
        )
      }

      setIsRegistering(true)

      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user.id,
            license_plate: licensePlate,
            description,
          }),
        )
      })

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso.')

      router.back()
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possivel registrar a saída do veículo')
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <VStack className="gap-4" style={{ paddingHorizontal: 40, paddingTop: 36 }}>
      <TextArea>
        <TextAreaLabel>Placa do veículo</TextAreaLabel>
        <TextAreaInput
          ref={licensePlateRef}
          value={licensePlate}
          maxLength={7}
          className="text-center font-robotoBold text-3xl text-typography-300"
          placeholder="BRA1234"
          onChangeText={(e) => setLicensePlate(e.toUpperCase())}
          onSubmitEditing={() => descriptionRef.current?.focus()}
          returnKeyType="next"
        />
      </TextArea>
      <TextArea className="h-40">
        <TextAreaLabel>Finalidade</TextAreaLabel>
        <TextAreaInput
          ref={descriptionRef}
          value={description}
          className="font-robotoMedium text-typography-300"
          placeholder="Vou utilizar o carro para..."
          multiline
          blurOnSubmit
          onChangeText={setDescription}
          onSubmitEditing={handleDepartureRegister}
          returnKeyType="send"
        />
      </TextArea>

      <Button
        className="h-14"
        size="xl"
        onPress={handleDepartureRegister}
        disabled={isRegistering}
      >
        {!isRegistering ? (
          <ButtonText>Registrar saída</ButtonText>
        ) : (
          <ButtonSpinner className="color-typography-50" size={'small'} />
        )}
      </Button>
    </VStack>
  )
}
