import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useRouter } from 'expo-router'
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native'

import type { EachList } from '@/@types/api/lists'

import { HStack, VStack } from '@/components/ui/view'
import { cifraApi } from '@/libs/cifra-api'
import { useTheme } from '@/providers/theme-provider'

import { ChevronRight, MagnifyingDollar } from '../icons'
import { Button } from '../ui/button'
import { Text } from '../ui/text'

async function recalculate(listId: string | number) {
  const { data } = await cifraApi.put<{ id: number }>('/api/lists/{id}/calculate/', {
  }, {
    routeParams: {
      id: String(listId),
    },
  })
  return data
}

export type ListCardProps = {
  list: EachList
  onRefresh?: () => void
}

export function ListCard({ list, onRefresh }: ListCardProps) {
  const router = useRouter()
  const { theme } = useTheme()

  const recalculateMutation = useMutation({
    mutationFn: () => {
      return recalculate(list.id)
    },
    onSuccess: async () => {
      if (!onRefresh) {
        return
      }
      onRefresh()
    },
    onError: () => {
      Alert.alert(
        'Erro ao recalcular os preços',
        'Tente novamente mais tarde ou verifique os dados informados.',
      )
    },
  })

  const floatedPrice = Number.parseFloat(String(list.total_price || 0))
  const displayPrice = `R$ ${floatedPrice.toFixed(2).replace('.', ',')}`
  const displayDate = format(
    list.last_update || new Date(),
    'dd/MM/yyyy\' às \'HH:mm',
  )

  const handleNavigateToList = () => {
    router.navigate({
      pathname: '/(private)/lists/[id]/manage',
      params: { id: String(list.id) },
    })
  }

  return (
    <TouchableOpacity
      onPress={handleNavigateToList}
      style={{
        backgroundColor: theme.colors.gray[0],
        borderRadius: theme.radius.xl,
        marginBottom: theme.spacing['4xl'],
        padding: theme.spacing['4xl'],
      }}
    >
      <VStack alignItems="stretch">
        <HStack marginBottom={theme.spacing['8xl']}>
          <Text flex={1} color={theme.colors.gray[600]}>
            {list.name}
          </Text>
          <ChevronRight size={14} color={theme.colors.gray[600]} />
        </HStack>
        <VStack
          paddingBottom={theme.spacing['4xl']}
          marginBottom={theme.spacing['4xl']}
          borderBottomColor={theme.colors.gray[100]}
          borderBottomWidth={1}
        >
          <Text color={theme.colors.gray[400]} fontSize={theme.font.size.sm}>Total a pagar</Text>
          <Text
            color={theme.colors.gray[600]}
            fontSize={theme.font.size.md}
            fontWeight={theme.font.weight.bold}
          >
            {displayPrice}
          </Text>
          <Text
            color={theme.colors.yellow[500]}
            fontSize={theme.font.size.sm}
            paddingTop={theme.spacing['3xl']}
          >
            {!list.best_store
              ? 'Produtos não encontrados. Tente novamente mais tarde.'
              : (
                  <>
                    Última atualização em
                    {' '}
                    {displayDate}
                  </>
                )}
          </Text>
        </VStack>
        <HStack>
          <Button
            variant="ghost"
            radius="sm"
            style={{ flex: 1 }}
            onPress={() => recalculateMutation.mutate()}
            disabled={recalculateMutation.isPending}
          >
            {recalculateMutation.isPending
              ? <ActivityIndicator />
              : (
                  <Text
                    numberOfLines={1}
                    fontSize={theme.font.size.md}
                    color={theme.colors.darkBlue[700]}
                  >
                    Recalcular preço
                  </Text>
                )}
          </Button>
          <Button
            variant="outlined"
            radius="sm"
            style={{
              flex: 1,
              borderColor: theme.colors.darkBlue[700],
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <MagnifyingDollar color={theme.colors.darkBlue[700]} size={16} />
            <Text
              numberOfLines={1}
              fontSize={theme.font.size.md}
              color={theme.colors.darkBlue[700]}
              fontWeight={theme.font.weight.medium}
              paddingLeft={5}
            >
              Local de compra
            </Text>
          </Button>
        </HStack>
      </VStack>
    </TouchableOpacity>
  )
}
