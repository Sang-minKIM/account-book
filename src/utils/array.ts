import { toInteger } from './number'

export function times<R = number>(n?: number, getValue?: (index: number) => R): R[] {
  n = toInteger(n)

  if (n < 1 || !Number.isSafeInteger(n)) {
    return []
  }

  const result = new Array(n)

  for (let i = 0; i < n; i++) {
    result[i] = typeof getValue === 'function' ? getValue(i) : i
  }

  return result
}
