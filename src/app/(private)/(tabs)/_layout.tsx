import { Tabs } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { FormIcon, SearchIcon, UserIcon } from '@/components/icons'
import { useTheme } from '@/providers/theme-provider'

export default function TabLayout() {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()
  const height = insets.bottom + 60

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.darkBlue[700],
        headerShown: false,
        tabBarStyle: {
          height,
          borderTopWidth: 0,
          borderTopColor: 'transparent',
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Busca',
          tabBarIcon: ({ color }) => <SearchIcon size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="lists/page"
        options={{
          title: 'Listas',
          tabBarIcon: ({ color }) => <FormIcon size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/page"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <UserIcon size={20} color={color} />,
        }}
      />
    </Tabs>
  )
}
