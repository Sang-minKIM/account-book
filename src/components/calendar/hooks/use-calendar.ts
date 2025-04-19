import { useReducer } from 'react'
import { getLastDateOfMonth } from '../utils/get-last-date-of-month'
import { getPrevMonthAndYear } from '../utils/get-prev-month-and-year'
import { getNextMonthAndYear } from '../utils/get-next-month-and-year'
import type { OneBasedMonth } from '../types'

export interface DateState {
  year: number
  oneBasedMonth: OneBasedMonth
  date: number
}

export const useCalendar = (defaultDate = new Date()) => {
  const MONTH_OFFSET = 1

  const initialDate = {
    year: defaultDate.getFullYear(),
    oneBasedMonth: defaultDate.getMonth() + MONTH_OFFSET,
    date: defaultDate.getDate(),
  } as DateState

  const [{ year, oneBasedMonth, date }, dispatch] = useReducer(dateReducer, initialDate)

  return { year, oneBasedMonth, date, dispatch }
}

function dateReducer(state: DateState, action: ActionType): DateState {
  switch (action.type) {
    case ACTION_TYPE.SET_MONTH:
      return { ...state, oneBasedMonth: action.payload, date: 1 }
    case ACTION_TYPE.SET_PREV_MONTH: {
      const [prevYear, prevMonth] = getPrevMonthAndYear(state.year, state.oneBasedMonth)
      const datesInPrevMonth = getLastDateOfMonth(prevYear, prevMonth)
      return {
        ...state,
        year: prevYear,
        oneBasedMonth: prevMonth,
        date: datesInPrevMonth,
      }
    }
    case ACTION_TYPE.SET_NEXT_MONTH: {
      const [nextYear, nextMonth] = getNextMonthAndYear(state.year, state.oneBasedMonth)
      const FIRST_DATE_OF_MONTH = 1
      return {
        ...state,
        year: nextYear,
        oneBasedMonth: nextMonth,
        date: FIRST_DATE_OF_MONTH,
      }
    }
    case ACTION_TYPE.SET_DATE:
      return { ...state, date: action.payload }
    default:
      return state
  }
}

export type ActionType =
  | { type: typeof ACTION_TYPE.SET_MONTH; payload: OneBasedMonth }
  | { type: typeof ACTION_TYPE.SET_PREV_MONTH }
  | { type: typeof ACTION_TYPE.SET_NEXT_MONTH }
  | { type: typeof ACTION_TYPE.SET_DATE; payload: number }

export const ACTION_TYPE = {
  SET_MONTH: 'SET_MONTH',
  SET_PREV_MONTH: 'SET_PREV_MONTH',
  SET_NEXT_MONTH: 'SET_NEXT_MONTH',
  SET_DATE: 'SET_DATE',
} as const
