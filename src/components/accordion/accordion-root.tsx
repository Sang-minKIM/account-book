import { Container } from '@radix-ui/themes'
import { ReactNode } from 'react'

interface RootProps {
  children: ReactNode
  className?: string
}

export const AccordionRoot = ({ children, className }: RootProps) => {
  return (
    <Container width="100%" py="3" px="4" className={className}>
      {children}
    </Container>
  )
}
