import { router, useGlobalSearchParams } from "expo-router";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getList } from "./add-products"
import { HStack, VStack } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/providers/theme-provider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { cifraApi } from "@/libs/cifra-api";
import { EachListProduct, ListProductPaginated } from "@/@types/api/lists";

async function fetchListProducts(list: number | string, page: number) {
  const { data } = await cifraApi.get<ListProductPaginated>('/api/lists/{list_pk}/products/', {
    params: {
      limit: 10,
      offset: (page - 1) * 10,
    },
    routeParams: { list_pk: String(list) },
  })
  return data
}

const ListSavedProductCard = ({ name, quantity, price, total_price }: EachListProduct) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity>
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
              Qtd: {quantity}
            </Text>
            {price && (
              <Text
                color={theme.colors.gray[600]}
                fontWeight={theme.font.weight.regular}
                fontSize={theme.font.size.sm}
              >
                Unidade: R$ {parseFloat(String(price)).toFixed(2).replace('.', ',')}
              </Text>
            )}
            {total_price && (
              <Text
                color={theme.colors.gray[600]}
                fontWeight={theme.font.weight.regular}
                fontSize={theme.font.size.sm}
              >
                Total: R$ {parseFloat(String(total_price)).toFixed(2).replace('.', ',')}
              </Text>
            )}
          </VStack>

          <VStack justifyContent="flex-start">
            <TouchableOpacity>
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

export default function ManageListPage() {
  const { theme } = useTheme();
  const { top } = useSafeAreaInsets();
  const params = useGlobalSearchParams<{ id: string }>();
  const listQuery = useQuery({
    queryKey: ['list-by-id', params.id],
    queryFn: () => getList(params.id),
  })

  const productsQuery = useInfiniteQuery({
    queryKey: ['lists'],
    queryFn: async ({ pageParam }) => {
      return fetchListProducts(params.id, pageParam)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next) {
        return null
      }
      return pages.length + 1
    },
  })
  const products = productsQuery.data?.pages.flatMap(page => page.results) || []

  return (
    <VStack flex={1} alignItems="stretch">
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
          onPress={() => router.canGoBack}
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
          {listQuery.data?.name ||  'Carregando...'}
        </Text>
      </HStack>

      <VStack flex={1} alignItems="stretch">
        <FlatList
          data={products}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={() => {
            if (productsQuery.hasNextPage && !productsQuery.isFetchingNextPage) {
              productsQuery.fetchNextPage()
            }
          }}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{
            paddingVertical: theme.spacing['6xl'],
            paddingHorizontal: theme.spacing['6xl'],
            alignItems: 'stretch',
          }}
          renderItem={({ item }) => <ListSavedProductCard {...item} />}
          onRefresh={() => productsQuery.refetch()}
          refreshing={productsQuery.isPending || productsQuery.isLoading}
        />
      </VStack>
    </VStack>
  )
}
