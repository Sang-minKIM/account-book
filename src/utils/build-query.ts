type EqualityOperator = 'eq' | 'neq'
type ComparisonOperator = 'gt' | 'lt' | 'gte' | 'lte'
type ArrayOperator = 'in'
type NullOperator = 'is'

type FilterCondition =
  | {
      column: string
      operator: EqualityOperator | ComparisonOperator
      value: string | number | boolean
    }
  | {
      column: string
      operator: ArrayOperator
      value: Array<string | number>
    }
  | {
      column: string
      operator: NullOperator
      value: 'null' | 'not.null'
    }

type SortOrder = 'asc' | 'desc'

interface SortCondition {
  column: string
  order: SortOrder
}

export interface QueryOptions {
  filters?: FilterCondition[]
  sort?: SortCondition[]
  limit?: number
}

/**
 * 엔드포인트에 필터링과 정렬 조건을 추가하는 함수
 * @param baseSearchParamsString 기본 엔드포인트 쿼리 (예: '?select=*,category:categories(*)')
 * @param options 필터링 및 정렬 옵션
 * @returns 완성된 쿼리 URL
 */
export function buildQuery(baseSearchParamsString: string, options: QueryOptions): string {
  const { filters, sort, limit } = options

  const hasFilters = filters !== undefined && filters.length > 0
  const hasSort = sort !== undefined && sort.length > 0
  const hasLimit = limit !== undefined

  if (!hasFilters && !hasSort && !hasLimit) {
    return baseSearchParamsString
  }

  const queryParams = new URLSearchParams(baseSearchParamsString)

  if (hasFilters) {
    const filterParamEntries = filters.map(filterToParamEntry)
    filterParamEntries.forEach(([name, value]) => queryParams.append(name, value))
  }

  if (hasSort) {
    const orderParts = sort.map((condition) => `${condition.column}.${condition.order}`)
    queryParams.set('order', orderParts.join(','))
  }

  if (hasLimit) {
    queryParams.set('limit', limit.toString())
  }

  return queryParams.toString()
}

function filterValueToString(filter: FilterCondition): string {
  if (filter.operator === 'in') {
    return filter.value.join(',')
  }
  return String(filter.value)
}

function filterToParamEntry(filter: FilterCondition) {
  const valueStr = filterValueToString(filter)
  return [filter.column, `${filter.operator}.${valueStr}`]
}
