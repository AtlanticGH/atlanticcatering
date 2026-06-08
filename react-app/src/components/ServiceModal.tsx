import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ModalCloseButton } from '@/components/ModalCloseButton'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { assetUrl } from '@/utils/assets'

export type ServiceModalItem = {
  name: string
  tagline: string
  description: string
  image: string
}

type ServiceModalProps = {
  service: ServiceModalItem | null
  isOpen: boolean
  onClose: () => void
}

export function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useBodyScrollLock(isOpen)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    panelRef.current?.focus()

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !service) return null

  const coverStyle = service.image
    ? {
        backgroundImage: `url('${assetUrl(service.image)}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        backgroundImage:
          'linear-gradient(135deg, rgba(85,190,82,0.25) 0%, transparent 50%), linear-gradient(225deg, rgba(219,153,51,0.2) 0%, transparent 50%), #0B1C2D',
        backgroundColor: '#0B1C2D',
      }

  return (
    <div
      className="profile-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      aria-hidden="false"
      onClick={onClose}
    >
      <div className="profile-modal-overlay" aria-hidden="true" />
      <div
        ref={panelRef}
        className="profile-modal-panel"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <ModalCloseButton onClose={onClose} />
        <div className="profile-modal-cover" style={coverStyle} />
        <div className="profile-modal-content">
          <h2 id="service-modal-title" className="text-xl font-semibold text-acll-navy tracking-tight mb-1">
            {service.name}
          </h2>
          <p className="text-acll-green text-[15px] font-medium mb-4">{service.tagline}</p>
          <p className="text-acll-navy/85 text-[15px] leading-relaxed mb-6">{service.description}</p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-acll-green text-white text-[14px] font-medium hover:bg-acll-green/90 transition-colors"
            onClick={onClose}
          >
            Get in touch
            <span aria-hidden="true" className="ml-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
