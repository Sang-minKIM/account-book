import { OneBasedMonth } from '../types/one-based-month'

export function getNextMonthAndYear(year: number, oneBasedMonth: OneBasedMonth): [number, OneBasedMonth] {
  const NEXT_MONTH_OFFSET = 1
  const JANUARY = 1
  const DECEMBER = 12

  const nextMonth = oneBasedMonth + NEXT_MONTH_OFFSET
  const nextYear = nextMonth > DECEMBER ? year + 1 : year
  const oneBasedNextMonth = nextMonth > DECEMBER ? JANUARY : (nextMonth as OneBasedMonth)
  return [nextYear, oneBasedNextMonth]
}
