import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { TouchableOpacity } from 'react-native'

import type { EachListProduct } from '@/@types/api/lists'

import { Text } from '@/components/ui/text'
import { HStack, VStack } from '@/components/ui/view'
import { useTheme } from '@/providers/theme-provider'

export type ListSavedProductCardProps = EachListProduct & {
  onDelete: () => void;
  onEdit: () => void;
}

export function ListSavedProductCard({
  name,
  quantity,
  price,
  total_price,
  onDelete,
  onEdit,
}: ListSavedProductCardProps) {
  const { theme } = useTheme()

  return (
    <TouchableOpacity onPress={onEdit}>
      <VStack
        marginBottom={theme.spacing['4xl']}
        padding={theme.spacing['6xl']}
        backgroundColor="#fff"
        borderRadius={10}
        width="100%"
      >
        <HStack alignItems="stretch">
          <VStack flex={1}>
            <Text
              color={theme.colors.gray[600]}
              fontWeight={theme.font.weight.bold}
              fontSize={theme.font.size.sm}
              marginBottom={theme.spacing['2xl']}
            >
              {name}
            </Text>
            <Text
              color={theme.colors.gray[600]}
              fontWeight={theme.font.weight.regular}
              fontSize={theme.font.size.sm}
            >
              Qtd:
              {' '}
              {quantity}
            </Text>
            {price && (
              <Text
                color={theme.colors.gray[600]}
                fontWeight={theme.font.weight.regular}
                fontSize={theme.font.size.sm}
              >
                Unidade: R$
                {' '}
                {Number.parseFloat(String(price)).toFixed(2).replace('.', ',')}
              </Text>
            )}
            {total_price && (
              <Text
                color={theme.colors.gray[600]}
                fontWeight={theme.font.weight.regular}
                fontSize={theme.font.size.sm}
              >
                Total: R$
                {' '}
                {Number.parseFloat(String(total_price)).toFixed(2).replace('.', ',')}
              </Text>
            )}
          </VStack>

          <VStack justifyContent="flex-start">
            <TouchableOpacity onPress={onDelete}>
              <FontAwesomeIcon
                color={theme.colors.gray[500]}
                icon={faTrash}
                size={18}
              />
            </TouchableOpacity>
          </VStack>
        </HStack>
      </VStack>
    </TouchableOpacity>
  )
}
