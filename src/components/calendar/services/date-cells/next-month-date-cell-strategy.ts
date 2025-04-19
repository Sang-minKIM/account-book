import { getFirstDayOfMonth } from '../../utils/get-first-day-of-month'
import { BaseDateCellStrategy, type DateRange } from './base-date-cell-strategy'
import type { OneBasedMonth } from '../../types'

export class NextMonthDateCellStrategy extends BaseDateCellStrategy {
  calculateRange(year: number, month: OneBasedMonth): DateRange {
    const targetMonth = this.getTargetMonth(month)
    const firstDayOfNextMonth = getFirstDayOfMonth(year, targetMonth)

    const FIRST_DATE_OF_MONTH = 1
    const WEEK_DAY_COUNT = 7

    return {
      startDate: FIRST_DATE_OF_MONTH,
      endDate: WEEK_DAY_COUNT - firstDayOfNextMonth,
    }
  }

  protected getTargetMonth(month: OneBasedMonth): OneBasedMonth {
    const DECEMBER = 12
    const JANUARY = 1

    const nextMonth = month + 1

    return (nextMonth > DECEMBER ? JANUARY : nextMonth) as OneBasedMonth
  }
}
