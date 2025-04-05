import type { components } from '@/@types/openapi'

export type EachProduct = components['schemas']['Product']
export type ProductsPaginated = Pagination<EachProduct>
