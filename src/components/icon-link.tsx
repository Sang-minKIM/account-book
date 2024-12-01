import { IconButton } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { IconLinkProps } from './icon-link.type'

export const IconLink = ({ children, to }: IconLinkProps) => {
  return (
    <IconButton variant="ghost" size="4" asChild>
      <Link to={to}>{children}</Link>
    </IconButton>
  )
}
