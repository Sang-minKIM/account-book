export const commaNumber = (number: number) => {
  return number.toLocaleString('ko-KR')
}

export const parseCommaNumber = (value: string) => {
  const cleanValue = value.replace(/[^\d,]/g, '')
  const number = Number(cleanValue.replace(/,/g, ''))

  return number
}
