import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { RefreshControl, ScrollView } from 'react-native'

import type { Pagination } from '@/@types/api/api'
import type { CategoriesPaginated, CategoriesQuery, EachCategory } from '@/@types/api/categories'
import type { EachProduct } from '@/@types/api/products'

import { Categories } from '@/components/home/home-categories'
import { Header } from '@/components/home/home-header'
import { Products } from '@/components/home/home-products'
import { cifraApi } from '@/libs/cifra-api'
import { useTheme } from '@/providers/theme-provider'

export type ProductByCategory = {
  category: EachCategory
  products: EachProduct[]
}

export type ProductByCategoryAndCategories = {
  productsData: ProductByCategory[]
  categoriesData: EachCategory[]
}

async function fetchProductsByCategories(): Promise<ProductByCategoryAndCategories> {
  const { data: productsArray } = await cifraApi.get<EachProduct[]>('/api/stores/products/promotions/')
  const { data: categoriesData } = await cifraApi.get<EachCategory[]>('/api/stores/categories/')

  function segregateProductsByCategory(products: EachProduct[]) {
    const productByCategory: { category: EachCategory, products: EachProduct[] }[] = []

    categoriesData.forEach((category) => {
      const productsByCategory = products.filter(product => product.category.id === category.id)
      if (productsByCategory.length > 0) {
        productByCategory.push({ category, products: productsByCategory })
      }
    })

    return productByCategory
  }

  const segregatedProducts = segregateProductsByCategory(productsArray)

  return {
    productsData: segregatedProducts,
    categoriesData,
  }
}

export default function Index() {
  const { setStatusBarStyle } = useTheme()

  const productQuery = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductsByCategories,
  })

  const productByCategory = productQuery.data?.productsData ?? []
  const categories = productQuery.data?.categoriesData ?? []

  const isLoading = productQuery.isLoading || productQuery.isFetching

  function handleRefresh() {
    productQuery.refetch()
  }

  useEffect(() => {
    setStatusBarStyle('light')
  }, [])

  return (
    <>
      <Header />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
      >
        <Categories data={categories} isLoading={isLoading} />
        <Products data={productByCategory} />
      </ScrollView>
    </>
  )
}
