import { styled } from 'styled-components'
import { useAccordionItemContext } from './context'
import { ReactNode } from 'react'

interface BodyProps {
  children: ReactNode
}

export const AccordionBody = ({ children }: BodyProps) => {
  const { isOpen } = useAccordionItemContext()
  return <Content $isOpen={isOpen}>{isOpen ? children : null}</Content>
}
AccordionBody.type = 'AccordionBody' as const

const Content = styled.div<{ $isOpen: boolean }>`
  padding: ${({ $isOpen }) => ($isOpen ? '16px' : '0 16px')};
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`
