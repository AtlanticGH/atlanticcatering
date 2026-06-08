type ModalCloseButtonProps = {
  onClose: () => void
  variant?: 'light' | 'dark'
}

export function ModalCloseButton({ onClose, variant = 'dark' }: ModalCloseButtonProps) {
  const className =
    variant === 'light'
      ? 'absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-acll-navy'
      : 'absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-acll-navy/10 text-acll-navy hover:bg-acll-navy/20 focus:outline-none focus:ring-2 focus:ring-acll-green focus:ring-offset-2'

  return (
    <button type="button" className={className} aria-label="Close" onClick={onClose}>
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )
}
