import type { components } from '@/@types/openapi'

export type EachList = components['schemas']['List']

export type ListsPaginated = Pagination<EachList>
