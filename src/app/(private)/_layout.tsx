import { Stack } from 'expo-router'

export default function PrivateLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: 'transparent' },
        headerShown: false,
      }}
    />
  )
}
