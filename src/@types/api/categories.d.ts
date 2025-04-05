import type { components } from '../openapi'
import type { Pagination } from './api'

export type EachCategory = components['schemas']['Category']

export type CategoriesPaginated = Pagination<EachCategory>
