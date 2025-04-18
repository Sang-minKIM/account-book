type OneBasedMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export function getPrevMonthAndYear(year: number, oneBasedMonth: OneBasedMonth): [number, OneBasedMonth] {
  const prevMonth = oneBasedMonth - 1
  const prevYear = prevMonth < 1 ? year - 1 : year
  return [prevYear, (prevMonth < 1 ? 12 : prevMonth) as OneBasedMonth]
}
