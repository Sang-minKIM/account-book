import { getFirstDayOfMonth } from '../../utils/get-first-day-of-month'
import { getLastDateOfMonth } from '../../utils/get-last-date-of-month'
import { BaseDateCellStrategy, DateRange } from './base-date-cell-strategy'

export class PrevMonthDateCellStrategy extends BaseDateCellStrategy {
  calculateRange(year: number, month: number): DateRange {
    const firstDayOfCurrentMonth = getFirstDayOfMonth(year, month)
    const lastDateOfPrevMonth = getLastDateOfMonth(year, month - 1)

    return {
      startDate: lastDateOfPrevMonth - firstDayOfCurrentMonth + 1,
      endDate: lastDateOfPrevMonth,
    }
  }

  protected getTargetMonth(month: number): number {
    return month - 1
  }
}
