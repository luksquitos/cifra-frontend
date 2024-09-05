import { DepartureForm } from '@/components/routes/departure/departure-form'
import DepartureHeader from '@/components/routes/departure/departure-header'

import { VStack } from '@/components/ui/vstack'
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native'

const keyboardAvoidingViewBehavior =
  Platform.OS === 'android' ? 'height' : 'position'

export default function CheckOut() {
  return (
    <VStack>
      <DepartureHeader />
      <KeyboardAvoidingView behavior={keyboardAvoidingViewBehavior}>
        <ScrollView>
          <DepartureForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </VStack>
  )
}
