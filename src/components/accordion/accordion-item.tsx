import { ReactNode, ReactElement, useState } from 'react'
import { AccordionItemContext } from './context'
import { styled } from 'styled-components'
import { AccordionHeader } from './accordion-header'
import { AccordionBody } from './accordion-body'

type ItemChild =
  | ReactElement<{ children: NonNullable<ReactNode> }, typeof AccordionHeader>
  | ReactElement<{ children: NonNullable<ReactNode> }, typeof AccordionBody>

interface ItemProps {
  children: ItemChild[]
  className?: string
  defaultOpen?: boolean
}

export const AccordionItem = ({ children, className, defaultOpen = false }: ItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <AccordionItemContext.Provider value={{ isOpen, toggle: () => setIsOpen(!isOpen) }}>
      <ItemWrapper className={className}>{children}</ItemWrapper>
    </AccordionItemContext.Provider>
  )
}

const ItemWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`
