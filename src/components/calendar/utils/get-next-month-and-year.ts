type OneBasedMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export function getNextMonthAndYear(year: number, oneBasedMonth: OneBasedMonth): [number, OneBasedMonth] {
  const nextMonth = oneBasedMonth + 1
  const nextYear = nextMonth > 12 ? year + 1 : year
  return [nextYear, nextMonth > 12 ? 1 : (nextMonth as OneBasedMonth)]
}
