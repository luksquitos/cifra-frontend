import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useGlobalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { DeleteListSheet } from '@/components/lists/delete-list-sheet'
import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { useTheme } from '@/providers/theme-provider'

export default function ListSettingsPage() {
  const params = useGlobalSearchParams<{ id: string }>()
  const router = useRouter()
  const { top, bottom } = useSafeAreaInsets()
  const { theme, setStatusBarStyle } = useTheme()

  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setStatusBarStyle('dark')
  }, [])

  return (
    <VStack flex={1} alignItems="stretch" paddingBottom={bottom}>
      <HStack
        backgroundColor={theme.colors.gray[0]}
        paddingTop={top + theme.spacing['2xl']}
        paddingBottom={theme.spacing['2xl']}
        width="100%"
        gap={theme.spacing['4xl']}
        justifyContent="space-between"
        paddingHorizontal={theme.spacing['6xl']}
      >
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: 'center', height: 30, width: 30 }}
          onPress={() => router.back()}
        >
          <FontAwesomeIcon color={theme.colors.darkBlue[700]} icon={faChevronLeft} size={18} />
        </TouchableOpacity>
        <Text
          flex={1}
          fontSize={theme.font.size.lg}
          fontWeight={500}
          color={theme.colors.gray[700]}
          textAlign="center"
        >
          Configurações
        </Text>
      </HStack>

      <VStack flex={1} alignItems="stretch" padding={theme.spacing['4xl']}>
        <TouchableOpacity
          style={{
            marginBottom: theme.spacing['4xl'],
            backgroundColor: '#fff',
            borderRadius: theme.radius.lg,
            padding: theme.spacing['6xl'],
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            router.push({
              pathname: '/lists/[id]/rename',
              params: { id: params.id },
            })
          }}
        >
          <Text flex={1} color={theme.colors.gray[600]}>Alterar nome da lista</Text>
          <FontAwesomeIcon color={theme.colors.gray[600]} icon={faChevronRight} size={18} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginBottom: theme.spacing['4xl'],
            backgroundColor: '#fff',
            borderRadius: theme.radius.lg,
            padding: theme.spacing['6xl'],
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => setIsDeleting(true)}
        >
          <Text flex={1} color={theme.colors.gray[600]}>Excluir lista</Text>
          <FontAwesomeIcon color={theme.colors.gray[600]} icon={faChevronRight} size={18} />
        </TouchableOpacity>
      </VStack>
      {isDeleting && (
        <DeleteListSheet
          onClose={() => setIsDeleting(false)}
        />
      )}
    </VStack>
  )
}
