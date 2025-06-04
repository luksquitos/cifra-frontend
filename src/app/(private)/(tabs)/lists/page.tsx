import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import type { ListsPaginated } from '@/@types/api/lists'

import { FormIcon } from '@/components/icons'
import { ListCard } from '@/components/lists/list-card'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/view'
import { cifraApi } from '@/libs/cifra-api'
import { useTheme } from '@/providers/theme-provider'

function ListEmpty() {
  const router = useRouter()
  const { theme } = useTheme()

  return (
    <VStack paddingHorizontal={20} alignItems="center" justifyContent="center">
      <FormIcon
        color={theme.colors.darkBlue[700]}
        style={{ marginBottom: theme.spacing['11xl'] }}
      />
      <Text
        fontWeight={theme.font.weight.bold}
        fontSize={theme.font.size.lg}
        textAlign="center"
        marginTop={theme.spacing['11xl']}
        color={theme.colors.gray[600]}
      >
        Você ainda não tem nenhuma lista
      </Text>
      <Text
        fontWeight={theme.font.weight.regular}
        fontSize={theme.font.size.md}
        textAlign="center"
        marginTop={theme.spacing['3xl']}
        marginBottom={theme.spacing['6xl']}
        color={theme.colors.gray[500]}
      >
        Crie uma lista com os materiais de sua escolha e compare o valor total entre as lojas.
      </Text>
      <Button
        onPress={() => router.push('/lists/create-list')}
        style={{ width: '100%', alignItems: 'center', paddingVertical: theme.spacing['3xl'] }}
        radius="lg"
        variant="secondary"
      >
        <Text
          fontSize={theme.font.size.md}
          fontWeight={theme.font.weight.medium}
          color={theme.colors.gray[600]}
        >
          +
          {'  '}
          Criar lista
        </Text>
      </Button>
    </VStack>
  )
}

async function fetchLists(page: number): Promise<ListsPaginated> {
  const { data } = await cifraApi.get<ListsPaginated>('/api/lists/', {
    params: {
      limit: 10,
      offset: (page - 1) * 10,
    },
  })
  return data
}

export default function Lists() {
  const { theme } = useTheme()
  const { top } = useSafeAreaInsets()
  const router = useRouter()

  const listsQuery = useInfiniteQuery({
    queryKey: ['lists'],
    queryFn: async ({ pageParam }) => {
      return fetchLists(pageParam)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next) {
        return null
      }
      return pages.length + 1
    },
  })
  const lists = listsQuery.data?.pages.flatMap(page => page.results) || []

  return (
    <VStack flex={1}>
      <VStack
        width="100%"
        paddingTop={top + 10}
        backgroundColor={theme.colors.gray[0]}
        paddingHorizontal={theme.spacing['6xl']}
        paddingBottom={theme.spacing['3xl']}
        gap={theme.spacing.lg}
      >
        <Text fontWeight={theme.font.weight.bold} fontSize={theme.font.size.xl}>Listas salvas</Text>
        <Text color={theme.colors.gray[400]} fontSize={theme.font.size.md}>Crie novas listas de materiais, compare valores entre diferentes lojas e gerencie as listas existentes.</Text>
      </VStack>
      <VStack flex={1} width="100%" alignItems="stretch" justifyContent="center" paddingHorizontal={theme.spacing['6xl']}>
        {!lists.length
          ? (
              <ListEmpty />
            )
          : (
              <FlatList
                data={lists}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                onEndReached={() => {
                  if (listsQuery.hasNextPage && !listsQuery.isFetchingNextPage) {
                    listsQuery.fetchNextPage()
                  }
                }}
                onEndReachedThreshold={0.5}
                contentContainerStyle={{
                  paddingVertical: theme.spacing['6xl'],
                  alignItems: 'stretch',
                }}
                renderItem={({ item }) => (
                  <ListCard
                    list={item}
                    onRefresh={() => listsQuery.refetch()}
                  />
                )}
                onRefresh={() => listsQuery.refetch()}
                refreshing={listsQuery.isPending || listsQuery.isLoading}
              />
            )}
      </VStack>
      <Button
        variant="secondary"
        radius="full"
        width={60}
        height={60}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 20,
          paddingHorizontal: 0,
          paddingVertical: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => router.navigate('/lists/create-list')}
      >
        <Text textAlign="center" fontSize={24}>+</Text>
      </Button>
    </VStack>
  )
}
