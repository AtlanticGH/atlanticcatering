import { useEffect, useRef } from 'react'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { assetUrl } from '@/utils/assets'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoSrc?: string
  poster?: string
}

export function VideoModal({
  isOpen,
  onClose,
  videoSrc = assetUrl('video/ACLL VIDEO 1.mp4'),
  poster = assetUrl('images/DSC04979.jpg'),
}: VideoModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<HTMLVideoElement>(null)

  useBodyScrollLock(isOpen)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    panelRef.current?.focus()

    const player = playerRef.current
    if (player) {
      player.currentTime = 0
      void player.play().catch(() => {})
    }

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) return

    const player = playerRef.current
    if (player) {
      player.pause()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      id="video-modal"
      className="profile-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Video: Who we are"
      aria-hidden="false"
    >
      <div
        className="profile-modal-overlay video-modal-overlay"
        id="video-modal-overlay"
        onClick={onClose}
      />
      <div
        className="profile-modal-panel video-modal-panel"
        id="video-modal-panel"
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="video-modal-inner rounded-xl overflow-hidden bg-acll-navy">
          <video
            id="video-modal-player"
            ref={playerRef}
            className="w-full h-full object-contain"
            controls
            playsInline
            preload="metadata"
            poster={poster}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  )
}
