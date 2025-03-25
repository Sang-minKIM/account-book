import { styled } from 'styled-components'
import { useAccordionItemContext } from './context'
import { ReactElement, ReactNode } from 'react'
import { AccordionIcon } from './accordion-icon'
import { AccordionTitle } from './accordion-title'
import { Button } from '@radix-ui/themes'

type HeaderChild =
  | ReactElement<{ children: NonNullable<ReactNode | string> }, typeof AccordionTitle>
  | ReactElement<{ children: NonNullable<ReactNode> }, typeof AccordionIcon>

interface HeaderProps {
  children: HeaderChild[]
  width?: string
  height?: string
  className?: string
}

export const AccordionHeader = ({ children, width = '100%', height = 'auto', className }: HeaderProps) => {
  const { toggle } = useAccordionItemContext()
  return (
    <TabButton
      width={width}
      height={height}
      onClick={toggle}
      className={className}
      variant="ghost"
      color="gray"
      highContrast
    >
      {children}
    </TabButton>
  )
}
AccordionHeader.type = 'AccordionHeader' as const

const TabButton = styled(Button)<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
