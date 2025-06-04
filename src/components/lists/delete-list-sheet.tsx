import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'

import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useGlobalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useEffect, useRef } from 'react'
import { ActivityIndicator, Alert } from 'react-native'

import { cifraApi } from '@/libs/cifra-api'
import { useTheme } from '@/providers/theme-provider'

import { Button } from '../ui/button'
import { Text } from '../ui/text'
import { VStack } from '../ui/view'

async function deleteList(listId: string | number) {
  await cifraApi.delete('/api/lists/{id}/', {
    routeParams: {
      id: String(listId),
    },
  })
}

export function DeleteListSheet({
  onClose,
}: {
  onClose: () => void
}) {
  const router = useRouter()
  const params = useGlobalSearchParams<{ id: string }>()
  const { theme } = useTheme()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const queryClient = useQueryClient()

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    bottomSheetRef.current?.snapToIndex(0)
  }, [params.id])

  const deleteListMutation = useMutation({
    mutationFn: () => {
      return deleteList(params.id)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] })
      bottomSheetRef.current?.close()
      router.replace('/lists/page')
    },
    onError: () => {
      Alert.alert(
        'Erro ao deletar lista',
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
        <VStack flex={1} alignItems="stretch">
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
              Excluir lista?
            </Text>

            <Text
              color={theme.colors.gray[600]}
              textAlign="center"
              fontSize={theme.font.size.md}
              fontWeight={theme.font.weight.regular}
              marginBottom={theme.spacing['4xl']}
            >
              Ao confirmar, esta lista será apagada junto com todos os produtos adicionados.
            </Text>

            <Button
              variant="secondary"
              radius="md"
              disabled={deleteListMutation.isPending}
              onPress={() => deleteListMutation.mutate()}
            >
              {deleteListMutation.isPending
                ? <ActivityIndicator />
                : (
                    <Text textAlign="center">Confirmar</Text>
                  )}
            </Button>
            <Button
              variant="ghost"
              radius="md"
              disabled={deleteListMutation.isPending}
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
