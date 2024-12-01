import { IconButton } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { IconLinkProps } from './icon-link.type'

export const IconLink = ({ children, to, size = '4' }: IconLinkProps) => {
  return (
    <IconButton variant="ghost" size={size} asChild>
      <Link to={to}>{children}</Link>
    </IconButton>
  )
}
