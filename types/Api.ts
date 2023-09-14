export type Paginated<T> = {
  data: T[]
  meta: Meta
}

export type Meta = {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPageUrl: string
  nextPageUrl: string
  previousPageUrl: string
}
