import { useReducer } from 'react'
import { getLastDateOfMonth } from '../utils/get-last-date-of-month'
import { getPrevMonthAndYear } from '../utils/get-prev-month-and-year'
import { getNextMonthAndYear } from '../utils/get-next-month-and-year'

export interface DateState {
  year: number
  month: number
  day: number
}

export const useCalender = (defaultDate = new Date()) => {
  const initialDate = {
    year: defaultDate.getFullYear(),
    month: defaultDate.getMonth(),
    day: defaultDate.getDate(),
  }
  const [{ year, month, day }, dispatch] = useReducer(dateReducer, initialDate)

  return { year, month, day, dispatch }
}

function dateReducer(state: DateState, action: ActionType): DateState {
  switch (action.type) {
    case ACTION_TYPE.SET_MONTH:
      return { ...state, month: action.payload, day: 1 }
    case ACTION_TYPE.SET_PREV_MONTH: {
      const [prevYear, prevMonth] = getPrevMonthAndYear(state.year, state.month)
      const daysInPrevMonth = getLastDateOfMonth(prevYear, prevMonth)
      return {
        ...state,
        year: prevYear,
        month: prevMonth,
        day: daysInPrevMonth,
      }
    }
    case ACTION_TYPE.SET_NEXT_MONTH: {
      const [nextYear, nextMonth] = getNextMonthAndYear(state.year, state.month)
      return {
        ...state,
        year: nextYear,
        month: nextMonth,
        day: 1,
      }
    }
    case ACTION_TYPE.SET_DAY:
      return { ...state, day: action.payload }
    default:
      return state
  }
}

export type ActionType =
  | { type: typeof ACTION_TYPE.SET_MONTH; payload: number }
  | { type: typeof ACTION_TYPE.SET_PREV_MONTH }
  | { type: typeof ACTION_TYPE.SET_NEXT_MONTH }
  | { type: typeof ACTION_TYPE.SET_DAY; payload: number }

export const ACTION_TYPE = {
  SET_MONTH: 'SET_MONTH',
  SET_PREV_MONTH: 'SET_PREV_MONTH',
  SET_NEXT_MONTH: 'SET_NEXT_MONTH',
  SET_DAY: 'SET_DAY',
} as const
