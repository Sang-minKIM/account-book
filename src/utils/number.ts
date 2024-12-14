function isSymbol(value?: unknown): value is symbol {
  return typeof value === 'symbol' || value instanceof Symbol
}

export function toNumber(value?: unknown): number {
  if (isSymbol(value)) {
    return NaN
  }

  return Number(value)
}

export function toFinite(value?: unknown): number {
  if (!value) {
    return value === 0 ? value : 0
  }

  value = toNumber(value)

  if (value === Infinity || value === -Infinity) {
    const sign = value < 0 ? -1 : 1
    return sign * Number.MAX_VALUE
  }

  return value === value ? (value as number) : 0
}

export function toInteger(value?: unknown): number {
  const finite = toFinite(value)
  const remainder = finite % 1

  return remainder ? finite - remainder : finite
}
