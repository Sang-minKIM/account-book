import { IconButton } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

interface IconLinkProps {
  children: React.ReactNode
  to: string
  size?: '1' | '2' | '3' | '4'
}

export const IconLink = ({ children, to, size = '4' }: IconLinkProps) => {
  return (
    <IconButton variant="ghost" size={size} asChild>
      <Link to={to}>{children}</Link>
    </IconButton>
  )
}
