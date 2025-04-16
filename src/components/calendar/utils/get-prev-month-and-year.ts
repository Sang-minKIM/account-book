export function getPrevMonthAndYear(year: number, month: number): [number, number] {
  const prevMonth = month - 1
  const prevYear = prevMonth < 0 ? year - 1 : year
  return [prevYear, (prevMonth + 12) % 12]
}
