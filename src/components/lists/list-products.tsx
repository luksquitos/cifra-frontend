import { fetchProductsByCategories } from "@/app/(private)/(tabs)/(home)"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { RefreshControl, ScrollView } from "react-native"
import { Products } from "./list-products-category"
import { fetchProducts } from "../search/search-products"

const ListAllProducsts = () => {
  const productQuery = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductsByCategories,
  })

  const productByCategory = productQuery.data?.productsData ?? []
  const isLoading = productQuery.isLoading || productQuery.isFetching

  function handleRefresh() {
    productQuery.refetch()
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
      }
    >
      <Products data={productByCategory} />
    </ScrollView>
  )
}

const ListSearchProducts = ({ search }: { search: string }) => {
  const query = useInfiniteQuery({
    queryKey: ['list-search-products', search],
    queryFn: async ({ pageParam }) => {
      return fetchProducts({ pageParam, search })
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce((acc, page) => acc + page.results.length, 0)
      return totalFetched < lastPage.count ? totalFetched : undefined
    },
    initialPageParam: 0,
  })
  const products = query.data?.pages.flatMap(page => page.results) || []

  return (
    <Products
      data={[
        {
          category: {
            id: 1,
            name: 'Resultados da busca'
          },
          products
        }
      ]}
    />
  )
}

export const ListProducts = ({ search }: { search: string }) => {
  if (!search) {
    return <ListAllProducsts />
  }
  return <ListSearchProducts search={search} />
}
