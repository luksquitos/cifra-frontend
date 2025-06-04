import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useGlobalSearchParams } from 'expo-router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import type { EachListProduct } from '@/@types/api/lists'

import { cifraApi } from '@/libs/cifra-api'
import { useTheme } from '@/providers/theme-provider'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Text } from '../ui/text'
import { HStack, VStack } from '../ui/view'

async function editProductOnList(listId: string | number, id: string | number, quantity: number) {
  const { data } = await cifraApi.patch<{ id: number }>('/api/lists/{list_pk}/products/{id}/', {
    quantity,
  }, {
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
  return data
}

export function EditProductOnListSheet({
  product,
  onClose,
}: {
  product: EachListProduct
  onClose: () => void
}) {
  const params = useGlobalSearchParams<{ id: string }>()
  const { theme } = useTheme()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [quantity, setQuantity] = useState(product.quantity || 1)
  const queryClient = useQueryClient()
  const { bottom } = useSafeAreaInsets()

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    bottomSheetRef.current?.snapToIndex(0)
    setQuantity(product.quantity || 1)
  }, [product])

  const editOnListMutation = useMutation({
    mutationFn: () => {
      return editProductOnList(params.id, product.id, quantity)
    },
    onSuccess: async () => {
      bottomSheetRef.current?.close()
      queryClient.invalidateQueries({ queryKey: ['lists'] })
      queryClient.invalidateQueries({ queryKey: ['list-by-id', params.id] })
    },
    onError: () => {
      Alert.alert(
        'Erro ao editar produto',
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
          <HStack padding={theme.spacing['4xl']}>
            {/* <Image
              source={product.image ? { uri: product.image, width: 120, height: 120 } : fallback}
              resizeMode="contain"
            /> */}
            <VStack flex={1} alignItems="stretch" justifyContent="center">
              <Text
                paddingLeft={10}
                color={theme.colors.gray[600]}
                fontWeight={theme.font.weight.medium}
                fontSize={theme.font.size.sm}
              >
                {product.name}
              </Text>
            </VStack>
          </HStack>
          <VStack
            backgroundColor={theme.colors.gray[50]}
            padding={theme.spacing['4xl']}
            alignItems="stretch"
          >
            <HStack
              alignItems="center"
              justifyContent="center"
              marginBottom={theme.spacing['4xl']}
            >
              <Button
                variant="secondary"
                radius="full"
                style={{
                  width: 48,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 0,
                  marginRight: 10,
                  backgroundColor: quantity <= 1
                    ? theme.colors.gray[200]
                    : theme.colors.yellow[300],
                }}
                disabled={quantity <= 1 || editOnListMutation.isPending}
                onPress={() => setQuantity(q => q - 1)}
              >
                <FontAwesomeIcon
                  color={theme.colors.gray[600]}
                  icon={faMinus}
                  size={14}
                />
              </Button>

              <Input
                value={String(quantity)}
                style={{ maxWidth: 80, width: 80 }}
                textAlign="center"
                readOnly
              />

              <Button
                variant="secondary"
                radius="full"
                style={{
                  width: 48,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 0,
                  marginLeft: 10,
                }}
                onPress={() => setQuantity(q => q + 1)}
                disabled={editOnListMutation.isPending}
              >
                <FontAwesomeIcon
                  color={theme.colors.gray[600]}
                  icon={faPlus}
                  size={14}
                />
              </Button>
            </HStack>

            <Button
              variant="secondary"
              radius="md"
              disabled={editOnListMutation.isPending}
              onPress={() => editOnListMutation.mutate()}
            >
              {editOnListMutation.isPending
                ? <ActivityIndicator />
                : (
                    <Text textAlign="center">Salvar</Text>
                  )}
            </Button>
          </VStack>
        </VStack>
      </BottomSheetView>
    </BottomSheet>
  )
}
