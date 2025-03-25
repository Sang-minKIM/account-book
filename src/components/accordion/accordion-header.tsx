import { styled } from 'styled-components'
import { useAccordionItemContext } from './context'
import { ReactElement, ReactNode } from 'react'
import { AccordionIcon } from './accordion-icon'
import { AccordionTitle } from './accordion-title'

type HeaderChild =
  | ReactElement<{ children: NonNullable<ReactNode | string> }, typeof AccordionTitle>
  | ReactElement<{ children: NonNullable<ReactNode> }, typeof AccordionIcon>

interface HeaderProps {
  children: HeaderChild[]
  width?: string
  height?: string
}

export const AccordionHeader = ({ children, width = '100%', height = 'auto' }: HeaderProps) => {
  const { toggle } = useAccordionItemContext()
  return (
    <TabButton width={width} height={height} onClick={toggle}>
      {children}
    </TabButton>
  )
}
AccordionHeader.type = 'AccordionHeader' as const

const TabButton = styled.button<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: var(--accent-7);
  }
`
