export interface NavLink {
  label: string
  path: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Sustainability', path: '/sustainability' },
  { label: 'News', path: '/news' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
]

export function isActive(currentPath: string, linkPath: string): boolean {
  if (linkPath === '/') {
    return currentPath === '/'
  }

  return currentPath === linkPath || currentPath.startsWith(`${linkPath}/`)
}
