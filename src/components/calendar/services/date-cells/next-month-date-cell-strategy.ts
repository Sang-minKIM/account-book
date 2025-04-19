import { getFirstDayOfMonth } from '../../utils/get-first-day-of-month'
import { BaseDateCellStrategy, type DateRange } from './base-date-cell-strategy'
import type { OneBasedMonth } from '../../types'

export class NextMonthDateCellStrategy extends BaseDateCellStrategy {
  private readonly WEEK_DAY_COUNT = 7
  private readonly NEXT_MONTH_OFFSET = 1

  calculateRange(year: number, month: OneBasedMonth): DateRange {
    const targetMonth = this.getTargetMonth(month)
    const firstDayOfNextMonth = getFirstDayOfMonth(year, targetMonth)
    const FIRST_DATE_OF_MONTH = 1
    return {
      startDate: FIRST_DATE_OF_MONTH,
      endDate: this.WEEK_DAY_COUNT - firstDayOfNextMonth,
    }
  }

  protected getTargetMonth(month: OneBasedMonth): OneBasedMonth {
    const DECEMBER = 12
    const JANUARY = 1
    return (month + this.NEXT_MONTH_OFFSET > DECEMBER ? JANUARY : month + this.NEXT_MONTH_OFFSET) as OneBasedMonth
  }
}
