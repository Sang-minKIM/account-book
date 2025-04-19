import type { OneBasedMonth } from '../../types/one-based-month'
import { getLastDateOfMonth } from '../../utils/get-last-date-of-month'
import { BaseDateCellStrategy, type DateRange } from './base-date-cell-strategy'

export class CurrentMonthDateCellStrategy extends BaseDateCellStrategy {
  calculateRange(year: number, month: OneBasedMonth): DateRange {
    const FIRST_DATE_OF_MONTH = 1
    return {
      startDate: FIRST_DATE_OF_MONTH,
      endDate: getLastDateOfMonth(year, month),
    }
  }

  protected getTargetMonth(month: OneBasedMonth): OneBasedMonth {
    return month
  }
}
