import type { components, operations } from '@/@types/openapi'

import { ProductHistory } from '@/@types/api/products'

import type { Pagination } from './api'

export type EachProduct = components['schemas']['Product']
export type ProductsPaginated = Pagination<EachProduct>
export type FetchProductsFilter =
  operations['stores_products_list']['parameters']['query']
export type ProductHistory = {
  price: string
  created_at: string
}
export type ProductCaracteristics =
  components['schemas']['PriceCharacteristics']

export type ProductHistoryQuery =
  operations['stores_products_historic_list']['parameters']['query']
