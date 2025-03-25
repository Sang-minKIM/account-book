import { Box } from '@radix-ui/themes'
import { ReactNode } from 'react'

interface RootProps {
  children: ReactNode
  className?: string
}

export const AccordionRoot = ({ children, className }: RootProps) => {
  return (
    <Box width="100%" className={className}>
      {children}
    </Box>
  )
}
