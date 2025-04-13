import { Button, ButtonProps } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'
import { styled } from 'styled-components'

export const Day = ({ date, children, ...props }: PropsWithChildren<{ date: number }> & ButtonProps) => {
  return (
    <DayButton {...props}>
      {date}
      {children}
    </DayButton>
  )
}

const DayButton = styled(Button)`
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
