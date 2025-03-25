import { ChevronRightIcon } from '@radix-ui/react-icons'
import { useAccordionItemContext } from './context'
import styled from 'styled-components'

export const AccordionIcon = () => {
  const { isOpen } = useAccordionItemContext()
  return (
    <Arrow $isOpen={isOpen}>
      <ChevronRightIcon width="12px" height="12px" />
    </Arrow>
  )
}
AccordionIcon.type = 'AccordionIcon' as const

const Arrow = styled.span<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(90deg)' : 'rotate(0)')};
  transition: transform 0.2s linear;
`
