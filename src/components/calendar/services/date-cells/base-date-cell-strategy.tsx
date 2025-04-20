import { map, pipe, range, toArray } from '@fxts/core'

import { getDay } from '../../utils/get-day'
import { DateCell } from '../../date-cell'
import type { DateCellRenderer, OneBasedMonth } from '../../types'
import { Fragment } from 'react/jsx-runtime'

export interface DateRange {
  startDate: number
  endDate: number
}

export abstract class BaseDateCellStrategy {
  constructor(protected dateCellRenderer: DateCellRenderer) {}

  protected abstract calculateRange(year: number, oneBasedMonth: OneBasedMonth): DateRange

  protected abstract getTargetMonth(oneBasedMonth: OneBasedMonth): OneBasedMonth

  createCells(year: number, oneBasedMonth: OneBasedMonth): ReturnType<typeof DateCell>[] {
    const range = this.calculateRange(year, oneBasedMonth)
    return pipe(
      this.inclusiveRange(range.startDate, range.endDate),
      map((date) => {
        const key = this.createDateKey(year, oneBasedMonth, date)
        return (
          <Fragment key={key}>
            {this.dateCellRenderer({
              year,
              oneBasedMonth: this.getTargetMonth(oneBasedMonth),
              date,
              day: getDay(year, this.getTargetMonth(oneBasedMonth), date),
            })}
          </Fragment>
        )
      }),
      toArray
    )
  }

  private inclusiveRange(start: number, inclusiveEnd: number) {
    const RANGE_OFFSET = 1
    return range(start, inclusiveEnd + RANGE_OFFSET)
  }

  private createDateKey(year: number, month: number, date: number): string {
    return `${year}-${month}-${date}`
  }
}
