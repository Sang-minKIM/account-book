import { getFirstDayOfMonth } from '../../utils/get-first-day-of-month'
import { getLastDateOfMonth } from '../../utils/get-last-date-of-month'
import { BaseDateCellStrategy, type DateRange } from './base-date-cell-strategy'
import type { OneBasedMonth } from '../../types'

export class PrevMonthDateCellStrategy extends BaseDateCellStrategy {
  calculateRange(year: number, month: OneBasedMonth): DateRange {
    const firstDayOfCurrentMonth = getFirstDayOfMonth(year, month)
    const targetMonth = this.getTargetMonth(month)
    const lastDateOfPrevMonth = getLastDateOfMonth(year, targetMonth)
    const DAY_INDEX_OFFSET = 1
    return {
      startDate: lastDateOfPrevMonth - firstDayOfCurrentMonth + DAY_INDEX_OFFSET,
      endDate: lastDateOfPrevMonth,
    }
  }

  protected getTargetMonth(month: OneBasedMonth): OneBasedMonth {
    const DECEMBER = 12
    const JANUARY = 1
    const PREV_MONTH_OFFSET = 1
    return (month - PREV_MONTH_OFFSET < JANUARY ? DECEMBER : month - PREV_MONTH_OFFSET) as OneBasedMonth
  }
}
