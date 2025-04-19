import { OneBasedMonth } from '../types/one-based-month'

export function getLastDateOfMonth(year: number, oneBasedMonth: OneBasedMonth): number {
  const MONTH_OFFSET = 1
  const zeroBasedMonth = oneBasedMonth - MONTH_OFFSET
  const LAST_DATE_OF_PREV_MONTH = 0
  return new Date(year, zeroBasedMonth, LAST_DATE_OF_PREV_MONTH).getDate()
}
