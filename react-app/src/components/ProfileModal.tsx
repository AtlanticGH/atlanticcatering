import { useEffect, useRef } from 'react'
import { ModalCloseButton } from '@/components/ModalCloseButton'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { assetUrl } from '@/utils/assets'

export type ProfileModalPerson = {
  name: string
  role: string
  bio: string
  image: string
}

type ProfileModalProps = {
  person: ProfileModalPerson | null
  isOpen: boolean
  onClose: () => void
}

export function ProfileModal({ person, isOpen, onClose }: ProfileModalProps) {
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

  if (!isOpen || !person) return null

  const paragraphs = person.bio
    .split(/\n+/)
    .map((text) => text.trim())
    .filter(Boolean)

  const imageStyle = person.image
    ? {
        backgroundImage: `url('${assetUrl(person.image)}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        background: 'linear-gradient(145deg, #e5e7eb 0%, #d1d5db 100%)',
      }

  return (
    <div
      className="profile-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      aria-hidden="false"
      onClick={onClose}
    >
      <div className="profile-modal-overlay" aria-hidden="true" />
      <div
        ref={panelRef}
        className="profile-modal-panel profile-modal-panel--split"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <ModalCloseButton onClose={onClose} />
        <div className="profile-modal-body">
          <div
            className="profile-modal-cover profile-modal-image profile-modal-image--side"
            style={imageStyle}
          />
          <div className="profile-modal-content">
            <h2 id="profile-modal-title" className="text-xl font-semibold text-acll-navy tracking-tight mb-1">
              {person.name}
            </h2>
            <p className="text-acll-green text-[15px] font-medium mb-4">{person.role}</p>
            <div className="profile-modal-bio space-y-4 text-acll-navy/85 text-[15px] leading-relaxed">
              {paragraphs.length === 0 ? (
                <p className="profile-modal-bio-p" />
              ) : (
                paragraphs.map((text) => (
                  <p key={text} className="profile-modal-bio-p">
                    {text}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
