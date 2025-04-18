import { getFirstDayOfMonth } from '../../utils/get-first-day-of-month'
import { BaseDateCellStrategy, DateRange } from './base-date-cell-strategy'

export class NextMonthDateCellStrategy extends BaseDateCellStrategy {
  private readonly WEEK_DAY_COUNT = 7

  calculateRange(year: number, month: number): DateRange {
    const firstDayOfNextMonth = getFirstDayOfMonth(year, month + 1)

    return {
      startDate: 1,
      endDate: this.WEEK_DAY_COUNT - firstDayOfNextMonth,
    }
  }

  protected getTargetMonth(month: number): number {
    return month + 1
  }
}
