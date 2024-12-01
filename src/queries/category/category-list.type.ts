export interface CategoryResponse {
  id: number
  name: string
}

export type Category = CategoryResponse['name']
