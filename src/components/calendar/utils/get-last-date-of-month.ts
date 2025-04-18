type OneBasedMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export function getLastDateOfMonth(year: number, oneBasedMonth: OneBasedMonth): number {
  const MONTH_OFFSET = 1
  const zeroBasedMonth = oneBasedMonth - MONTH_OFFSET
  return new Date(year, zeroBasedMonth, 0).getDate()
}
