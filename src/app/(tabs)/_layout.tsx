import { Tabs } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ListIcon, ProfileIcon, SearchIcon } from '@/components/custom-icons'

export default function TabLayout() {
  const insets = useSafeAreaInsets()
  const height = insets.bottom + 60

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: false,
        tabBarStyle: { height },
      }}
    >
      <Tabs.Screen
        name="search"
        options={{
          title: 'Busca',
          tabBarIcon: ({ color }) => <SearchIcon size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="lists"
        options={{
          title: 'Listas',
          tabBarIcon: ({ color }) => <ListIcon size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <ProfileIcon size={20} color={color} />,
        }}
      />
    </Tabs>
  )
}
