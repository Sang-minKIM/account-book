import { OneBasedMonth } from '../types/one-based-month'

export function getPrevMonthAndYear(year: number, oneBasedMonth: OneBasedMonth): [number, OneBasedMonth] {
  const JANUARY = 1
  const DECEMBER = 12
  const prevMonth = oneBasedMonth - 1
  const prevYear = prevMonth < JANUARY ? year - 1 : year
  return [prevYear, (prevMonth < JANUARY ? DECEMBER : prevMonth) as OneBasedMonth]
}
