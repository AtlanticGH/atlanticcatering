import { useCallback, useEffect } from 'react'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'

interface PillarLightboxProps {
  open: boolean
  src: string
  alt: string
  onClose: () => void
}

export function PillarLightbox({ open, src, alt, onClose }: PillarLightboxProps) {
  useBodyScrollLock(open)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, handleKeyDown])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="View photo"
      onClick={onClose}
    >
      <button
        type="button"
        className="pillar-lightbox-close absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Close"
        onClick={onClose}
      >
        ×
      </button>
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  )
}
