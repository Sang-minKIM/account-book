import { map, pipe, range, toArray } from '@fxts/core'

import { getDay } from '../../utils/get-day'
import { DateCell } from '../../date-cell'
import type { DateCellRenderer, OneBasedMonth } from '../../types'

export interface DateRange {
  startDate: number
  endDate: number
}

export abstract class BaseDateCellStrategy {
  constructor(protected dateCellRenderer: DateCellRenderer) {}

  protected abstract calculateRange(year: number, month: OneBasedMonth): DateRange

  protected abstract getTargetMonth(month: OneBasedMonth): OneBasedMonth

  createCells(year: number, month: OneBasedMonth): ReturnType<typeof DateCell>[] {
    const range = this.calculateRange(year, month)
    return pipe(
      this.inclusiveRange(range.startDate, range.endDate),
      map((date) =>
        this.dateCellRenderer({
          year,
          month: this.getTargetMonth(month),
          date,
          day: getDay(year, this.getTargetMonth(month), date),
        })
      ),
      toArray
    )
  }

  private inclusiveRange(start: number, inclusiveEnd: number) {
    const RANGE_OFFSET = 1
    return range(start, inclusiveEnd + RANGE_OFFSET)
  }
}
