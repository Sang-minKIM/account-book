import { useReducer } from 'react'
import { ACTION_TYPE } from '../calender.model'
import { ActionType, DateState } from '../calender.type'
import { getLastDayOfMonth, getNextMonthAndYear, getPrevMonthAndYear } from '../services/calender'

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
      const daysInPrevMonth = getLastDayOfMonth(prevYear, prevMonth)
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
