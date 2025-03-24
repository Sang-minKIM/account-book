import { ChevronDownIcon } from '@radix-ui/themes'
import { useAccordionItemContext } from './context'
import styled from 'styled-components'

export const AccordionIcon = () => {
  const { isOpen } = useAccordionItemContext()
  return (
    <Arrow $isOpen={isOpen}>
      <ChevronDownIcon width="18px" height="18px" />
    </Arrow>
  )
}
AccordionIcon.type = 'AccordionIcon' as const

const Arrow = styled.span<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 0.3s ease;
`
