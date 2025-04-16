export type Pagination<T> = {
  count: number
  next: string | null
  results: T[]
  previous: string | null
}
