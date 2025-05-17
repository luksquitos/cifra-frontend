import { router } from 'expo-router'
import { Text, View } from 'react-native'

import { useSession } from '@/providers/session-provider'

export default function SignIn() {
  const { setSession } = useSession()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

    </View>
  )
}
