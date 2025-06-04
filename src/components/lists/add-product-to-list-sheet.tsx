import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'

import fallback from '@/assets/images/tinta.png'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useGlobalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, Image } from 'react-native'

import type { EachProduct } from '@/@types/api/products'

import { cifraApi } from '@/libs/cifra-api'
import { useTheme } from '@/providers/theme-provider'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Text } from '../ui/text'
import { HStack, VStack } from '../ui/view'

async function addProductToList(listId: string | number, name: string, quantity: number) {
  const { data } = await cifraApi.post<{ id: number }>('/api/lists/{list_pk}/products/', {
    name,
    quantity,
  }, {
    routeParams: {
      list_pk: String(listId),
    },
  })
  return data
}

async function recalculate(listId: string | number) {
  const { data } = await cifraApi.put<{ id: number }>('/api/lists/{id}/calculate/', {
  }, {
    routeParams: {
      id: String(listId),
    },
  })
  return data
}

export function AddProductToListSheet({
  product,
  onClose,
}: {
  product: EachProduct
  onClose: () => void
}) {
  const router = useRouter()
  const params = useGlobalSearchParams<{ id: string }>()
  const { theme } = useTheme()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [quantity, setQuantity] = useState(1)
  const queryClient = useQueryClient()

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    bottomSheetRef.current?.snapToIndex(0)
    setQuantity(1)
  }, [product])

  const addToListMutation = useMutation({
    mutationFn: async ({ redirect }: { redirect: boolean }) => {
      const { id } = await addProductToList(params.id, product.name, quantity)
      if (redirect) {
        await recalculate(params.id)
      }
      return { id }
    },
    onSuccess: async (_, { redirect }) => {
      queryClient.invalidateQueries({ queryKey: ['lists'] })
      queryClient.invalidateQueries({ queryKey: ['list-by-id', params.id] })
      bottomSheetRef.current?.close()
      if (redirect) {
        router.replace('/lists/page')
      }
    },
    onError: () => {
      Alert.alert(
        'Erro ao adicionar produto',
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
      style={{ zIndex: 600 }}
    >
      <BottomSheetView
        style={{
          flex: 1,
          alignItems: 'stretch',
        }}
      >
        <VStack flex={1} alignItems="stretch">
          <HStack padding={theme.spacing['4xl']}>
            <Image
              source={product.image ? { uri: product.image, width: 120, height: 120 } : fallback}
              resizeMode="contain"
            />
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
                disabled={quantity <= 1 || addToListMutation.isPending}
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
                disabled={addToListMutation.isPending}
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
              disabled={addToListMutation.isPending}
              onPress={() => addToListMutation.mutate({ redirect: false })}
            >
              <Text textAlign="center">Adicionar e ver mais produtos</Text>
            </Button>
            <Button
              variant="ghost"
              radius="md"
              disabled={addToListMutation.isPending}
              onPress={() => addToListMutation.mutate({ redirect: true })}
            >
              <Text
                textAlign="center"
                color={theme.colors.darkBlue[700]}
                marginTop={theme.spacing['2xl']}
              >
                Adicionar e salvar lista
              </Text>
            </Button>
          </VStack>
        </VStack>
      </BottomSheetView>
    </BottomSheet>
  )
}
