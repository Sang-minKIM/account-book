export function getNextMonthAndYear(year: number, month: number): [number, number] {
  const nextMonth = month + 1
  const nextYear = nextMonth > 11 ? year + 1 : year
  return [nextYear, nextMonth % 12]
}
