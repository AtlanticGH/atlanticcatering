import { forwardRef } from 'react'
import { Link as RouterLink, type LinkProps } from 'react-router-dom'

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  return <RouterLink ref={ref} {...props} />
})
