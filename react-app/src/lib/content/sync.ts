const CHANNEL_NAME = 'atlantic-cms-content'
const STORAGE_KEY = 'atlantic-cms-content-updated'

export type ContentUpdateMessage = {
  collectionId: string
  updatedAt: string
}

let channel: BroadcastChannel | null = null

function getChannel(): BroadcastChannel | null {
  if (typeof BroadcastChannel === 'undefined') return null
  if (!channel) channel = new BroadcastChannel(CHANNEL_NAME)
  return channel
}

/** Notify other tabs (and this tab) that CMS content was saved. */
export function notifyContentUpdated(collectionId: string): void {
  const message: ContentUpdateMessage = {
    collectionId,
    updatedAt: new Date().toISOString(),
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(message))
  } catch {
    // Ignore quota / private mode errors.
  }

  getChannel()?.postMessage(message)
  window.dispatchEvent(new CustomEvent<ContentUpdateMessage>('atlantic-cms-content-updated', { detail: message }))
}

export function subscribeToContentUpdates(onUpdate: (message: ContentUpdateMessage) => void): () => void {
  const channelRef = getChannel()

  function handleMessage(event: MessageEvent<ContentUpdateMessage>) {
    if (event.data?.updatedAt) onUpdate(event.data)
  }

  function handleStorage(event: StorageEvent) {
    if (event.key !== STORAGE_KEY || !event.newValue) return
    try {
      onUpdate(JSON.parse(event.newValue) as ContentUpdateMessage)
    } catch {
      // Ignore malformed payloads.
    }
  }

  function handleCustom(event: Event) {
    const detail = (event as CustomEvent<ContentUpdateMessage>).detail
    if (detail?.updatedAt) onUpdate(detail)
  }

  channelRef?.addEventListener('message', handleMessage)
  window.addEventListener('storage', handleStorage)
  window.addEventListener('atlantic-cms-content-updated', handleCustom)

  return () => {
    channelRef?.removeEventListener('message', handleMessage)
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener('atlantic-cms-content-updated', handleCustom)
  }
}
