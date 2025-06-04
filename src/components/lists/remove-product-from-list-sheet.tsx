import type { EachListProduct } from '@/@types/api/lists'
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'

import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useGlobalSearchParams } from 'expo-router'
import React, { useCallback, useEffect, useRef } from 'react'
import { ActivityIndicator, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { cifraApi } from '@/libs/cifra-api'
import { useTheme } from '@/providers/theme-provider'

import { Button } from '../ui/button'
import { Text } from '../ui/text'
import { VStack } from '../ui/view'

async function removeProductFromList(listId: string | number, id: number) {
  await cifraApi.delete('/api/lists/{list_pk}/products/{id}/', {
    routeParams: {
      list_pk: String(listId),
      id: String(id),
    },
  })
  await cifraApi.put<{ id: number }>('/api/lists/{id}/calculate/', {}, {
    routeParams: {
      id: String(listId),
    },
  })
}

export function RemoveProductFromListSheet({
  product,
  onClose,
}: {
  product: EachListProduct
  onClose: () => void
}) {
  const params = useGlobalSearchParams<{ id: string }>()
  const { theme } = useTheme()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const queryClient = useQueryClient()
  const { bottom } = useSafeAreaInsets()

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    bottomSheetRef.current?.snapToIndex(0)
  }, [product])

  const removeFromListMutation = useMutation({
    mutationFn: () => {
      return removeProductFromList(params.id, product.id)
    },
    onSuccess: async () => {
      bottomSheetRef.current?.close()
      queryClient.invalidateQueries({ queryKey: ['lists'] })
      queryClient.invalidateQueries({ queryKey: ['list-by-id', params.id] })
    },
    onError: () => {
      Alert.alert(
        'Erro ao remover produto',
        'Tente novamente mais tarde ou verifique os dados informados.',
      )
    },
  })

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.2}
      />
    ),
    [],
  )

  return (

    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView
        style={{
          flex: 1,
          alignItems: 'stretch',
        }}
      >
        <VStack flex={1} alignItems="stretch" paddingBottom={bottom}>
          <VStack
            padding={theme.spacing['4xl']}
            alignItems="stretch"
          >
            <Text
              color={theme.colors.gray[600]}
              textAlign="center"
              fontSize={theme.font.size.lg}
              fontWeight={theme.font.weight.medium}
              marginBottom={theme.spacing['4xl']}
            >
              Excluir produto?
            </Text>

            <Text
              color={theme.colors.gray[600]}
              textAlign="center"
              fontSize={theme.font.size.md}
              fontWeight={theme.font.weight.regular}
              marginBottom={theme.spacing['4xl']}
            >
              Ao confirmar, o produto será removido da lista.
            </Text>

            <Button
              variant="secondary"
              radius="md"
              disabled={removeFromListMutation.isPending}
              onPress={() => removeFromListMutation.mutate()}
            >
              {removeFromListMutation.isPending
                ? <ActivityIndicator />
                : (
                    <Text textAlign="center">Confirmar</Text>
                  )}
            </Button>
            <Button
              variant="ghost"
              radius="md"
              disabled={removeFromListMutation.isPending}
              onPress={() => bottomSheetRef.current?.close()}
            >
              <Text
                textAlign="center"
                color={theme.colors.darkBlue[700]}
                marginTop={theme.spacing['2xl']}
              >
                Cancelar
              </Text>
            </Button>
          </VStack>
        </VStack>
      </BottomSheetView>
    </BottomSheet>
  )
}
