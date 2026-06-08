import { getCmsMediaPublicUrl } from '@/lib/supabase/storage'
import { assetUrl } from '@/utils/assets'

export function resolveAssetPath(path: string): string {
  if (!path) return path
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
    return path
  }
  if (path.startsWith('cms-images/') || path.startsWith('cms-videos/')) {
    return getCmsMediaPublicUrl(path) ?? path
  }
  return assetUrl(path)
}

export function resolveAssetPathsDeep<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => resolveAssetPathsDeep(item)) as T
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [key, entry] of Object.entries(value)) {
      out[key] = resolveAssetPathsDeep(entry)
    }
    return out as T
  }
  if (typeof value === 'string' && (value.includes('/') || value.endsWith('.jpg') || value.endsWith('.png'))) {
    if (
      value.startsWith('images/') ||
      value.startsWith('video/') ||
      value.startsWith('assets/') ||
      value.startsWith('cms-images/') ||
      value.startsWith('cms-videos/')
    ) {
      return resolveAssetPath(value.replace(/^assets\//, '')) as T
    }
  }
  return value
}
