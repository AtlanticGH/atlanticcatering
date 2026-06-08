export function assetUrl(path: string): string {
  const normalized = path.replace(/^\/?assets\//, '')
  return `/assets/${normalized}`
}
