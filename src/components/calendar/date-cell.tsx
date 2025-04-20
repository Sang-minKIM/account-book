import { Button, ButtonProps } from '@radix-ui/themes'
import { ReactNode } from 'react'
import { styled } from 'styled-components'

interface DayProps<T extends ReactNode> extends ButtonProps {
  date: number
  children?: T
}

export const DateCell = <T extends ReactNode>({ date, children, ...props }: DayProps<T>) => {
  return (
    <DateCellButton {...props}>
      {date}
      {children}
    </DateCellButton>
  )
}

const DateCellButton = styled(Button)`
  width: 100%;
  height: 100%;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2px;
  box-sizing: border-box;
  background-color: transparent;
`
