import type { components, operations } from '../openapi'
import type { Pagination } from './api'

export type EachCategory = components['schemas']['Category']

export type CategoriesPaginated = Pagination<EachCategory>
export type CategoriesQuery = operations['stores_categories_list']['parameters']['query']
