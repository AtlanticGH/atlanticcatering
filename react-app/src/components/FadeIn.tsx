import { createElement, type HTMLAttributes, type ReactNode } from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'

type FadeInElement =
  | 'div'
  | 'span'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'section'
  | 'article'
  | 'a'

interface FadeInProps extends HTMLAttributes<HTMLElement> {
  as?: FadeInElement
  children?: ReactNode
}

export function FadeIn({ as = 'div', className, children, ...props }: FadeInProps) {
  const ref = useFadeIn()

  return createElement(
    as,
    {
      ref,
      className: className ? `fade-in ${className}` : 'fade-in',
      ...props,
    },
    children,
  )
}
