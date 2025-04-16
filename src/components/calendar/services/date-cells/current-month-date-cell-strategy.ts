import { DateRange } from '../../types'
import { getLastDateOfMonth } from '../../utils/get-last-date-of-month'
import { BaseDateCellStrategy } from './base-date-cell-strategy'

export class CurrentMonthDateCellStrategy extends BaseDateCellStrategy {
  calculateRange(year: number, month: number): DateRange {
    return {
      startDate: 1,
      endDate: getLastDateOfMonth(year, month),
    }
  }

  protected getTargetMonth(month: number): number {
    return month
  }
}
