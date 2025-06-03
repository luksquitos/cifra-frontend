import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { format } from 'date-fns'

import type { EachList } from '@/@types/api/lists'

import { HStack, VStack } from '@/components/ui/view'
import { useTheme } from '@/providers/theme-provider'

import { ChevronRight, MagnifyingDollar } from '../icons'
import { Button } from '../ui/button'
import { Text } from '../ui/text'

export type ListCardProps = {
  list: EachList
}

export function ListCard({ list }: ListCardProps) {
  const router = useRouter()
  const { theme } = useTheme()

  const floatedPrice = Number.parseFloat(String(list.total_price || 0));
  const displayPrice = `R$ ${floatedPrice.toFixed(2).replace('.', ',')}`;
  const displayDate = format(
    list.last_update || new Date(),
    "dd/MM/yyyy' às 'HH:mm"
  );

  const handleNavigateToList = () => {
    router.navigate({
      pathname: '/lists/[id]/products',
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
          <ChevronRight size={20} color={theme.colors.gray[600]} />
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
            Última atualização em {displayDate}
          </Text>
        </VStack>
        <HStack>
          <Button variant="ghost" radius="sm" style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              fontSize={theme.font.size.md}
              color={theme.colors.darkBlue[700]}
            >
              Recalcular preço
            </Text>
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
            <MagnifyingDollar color={theme.colors.darkBlue[700]} size={24} />
            <Text
              numberOfLines={1}
              fontSize={theme.font.size.md}
              color={theme.colors.darkBlue[700]}
              fontWeight={theme.font.weight.bold}
              paddingLeft={5}
            >
              Onde comprar
            </Text>
          </Button>
        </HStack>
      </VStack>
    </TouchableOpacity>
  )
}
