import { RequiredInfo } from '~/queries/payment'
import { ACTION_TYPE } from './calender.model'
import { Dispatch } from 'react'

export interface CalenderProps {
  defaultDate?: Date
  getDailyPayment: ({ type, year, month, day }: Pick<RequiredInfo, 'type'> & DateState) => number
  onDateChange?: (date: Date) => void
  year: number
  month: number
  day: number
  dispatch: Dispatch<ActionType>
}

export interface DateState {
  year: number
  month: number
  day: number
}

export type ActionType =
  | { type: typeof ACTION_TYPE.SET_MONTH; payload: number }
  | { type: typeof ACTION_TYPE.SET_PREV_MONTH }
  | { type: typeof ACTION_TYPE.SET_NEXT_MONTH }
  | { type: typeof ACTION_TYPE.SET_DAY; payload: number }
