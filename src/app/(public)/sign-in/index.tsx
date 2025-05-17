import { router } from 'expo-router'
import { Text, View } from 'react-native'

import { useSession } from '@/providers/session-provider'

export default function SignIn() {
  const { setSession } = useSession()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          setSession({ user: { id: '1', name: 'John Doe' } })
          router.replace('/')
        }}
      >
        Sign In
      </Text>
    </View>
  )
}
