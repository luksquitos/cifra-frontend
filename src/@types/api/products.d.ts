import type { components, operations } from '@/@types/openapi'

export type EachProduct = components['schemas']['Product']
export type ProductsPaginated = Pagination<EachProduct>
export type FetchProductsFilter = operations['stores_products_list']['parameters']['query']
