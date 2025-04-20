import { OneBasedMonth } from '../types/one-based-month'

export function getNextMonthAndYear(year: number, oneBasedMonth: OneBasedMonth): [number, OneBasedMonth] {
  const JANUARY = 1
  const DECEMBER = 12

  const nextMonthOfYear = oneBasedMonth + 1 > DECEMBER ? year + 1 : year
  const oneBasedNextMonth = oneBasedMonth + 1 > DECEMBER ? JANUARY : ((oneBasedMonth + 1) as OneBasedMonth)

  return [nextMonthOfYear, oneBasedNextMonth]
}
