import { EachList } from "@/@types/api/lists";
import { ListProducts } from "@/components/lists/list-products";
import { VStack } from "@/components/ui/view";
import { cifraApi } from "@/libs/cifra-api";
import { Text } from '@/components/ui/text'
import { useTheme } from "@/providers/theme-provider";
import { useQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { TouchableOpacity } from "react-native";
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

async function getList(id: number | string): Promise<EachList> {
  const { data } = await cifraApi.get<EachList>('/api/lists/{id}/', {
    routeParams: { id: String(id) },
  })
  return data
}

export default function ListProductsPage() {
  const [search, setSearch] = useDebounceValue('', 500)
  const { top } = useSafeAreaInsets()
  const { theme } = useTheme();
  const params = useGlobalSearchParams<{ id: string }>();
  const productQuery = useQuery({
    queryKey: ['product-by-id', params.id],
    queryFn: () => getList(params.id),
  })

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
        <Text fontWeight={theme.font.weight.bold} fontSize={theme.font.size.xl}>
          {productQuery.data?.name || 'Carregando...'}
        </Text>
        <Text color={theme.colors.gray[400]} fontSize={theme.font.size.md}>
          Escolha os materiais que deseja adicionar à lista.
        </Text>

        <Input
          value={search}
          onChangeText={(e) => setSearch(e)}
          append={search.length > 0
            ? (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    color={theme.colors.gray[500]}
                  />
                </TouchableOpacity>
              )
            : null}
          preppend={
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              color={theme.colors.gray[300]}
            />
          }
          placeholder="Procure por..."
        />
      </VStack>
      <ListProducts search={search} />
    </VStack>
  )
}
