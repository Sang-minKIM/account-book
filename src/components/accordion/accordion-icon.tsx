import { ChevronRightIcon } from '@radix-ui/react-icons'
import { useAccordionItemContext } from './context'
import styled from 'styled-components'

export const AccordionIcon = ({
  className,
  width = '16px',
  height = '16px',
}: {
  className?: string
  width?: string
  height?: string
}) => {
  const { isOpen } = useAccordionItemContext()
  return (
    <Arrow $isOpen={isOpen}>
      <ChevronRightIcon width={width} height={height} className={className} />
    </Arrow>
  )
}
AccordionIcon.type = 'AccordionIcon' as const

const Arrow = styled.span<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(90deg)' : 'rotate(0)')};
  transition: transform 0.2s linear;
`
