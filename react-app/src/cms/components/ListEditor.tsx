import { useState, type ReactNode } from 'react'

export function ListEditor<T>({
  items,
  onChange,
  getItemId,
  getItemLabel,
  renderItem,
  createItem,
  addLabel = 'Add item',
}: {
  items: T[]
  onChange: (items: T[]) => void
  getItemId: (item: T, index: number) => string
  getItemLabel: (item: T, index: number) => string
  renderItem: (item: T, index: number, update: (next: T) => void) => ReactNode
  createItem: () => T
  addLabel?: string
}) {
  const [openId, setOpenId] = useState<string | null>(null)

  function updateItem(index: number, next: T) {
    onChange(items.map((item, i) => (i === index ? next : item)))
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index))
  }

  function moveItem(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= items.length) return
    const next = [...items]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const id = getItemId(item, index)
        const isOpen = openId === id

        return (
          <div
            key={id}
            className="rounded-xl border border-acll-navy/[0.08] bg-acll-gray/25 overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : id)}
                className="min-w-0 flex-1 text-left"
              >
                <p className="truncate text-[14px] font-medium text-acll-navy">{getItemLabel(item, index)}</p>
              </button>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0}
                  className="rounded px-2 py-1 text-xs text-acll-muted hover:bg-white hover:text-acll-navy disabled:opacity-30 transition-colors"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 1)}
                  disabled={index === items.length - 1}
                  className="rounded px-2 py-1 text-xs text-acll-muted hover:bg-white hover:text-acll-navy disabled:opacity-30 transition-colors"
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : id)}
                  className="rounded-full px-3 py-1 text-xs font-medium text-acll-green hover:bg-white transition-colors"
                >
                  {isOpen ? 'Collapse' : 'Edit'}
                </button>
              </div>
            </div>
            {isOpen ? (
              <div className="space-y-4 border-t border-acll-navy/[0.06] bg-white p-4 sm:p-5">
                {renderItem(item, index, (next) => updateItem(index, next))}
              </div>
            ) : null}
          </div>
        )
      })}

      <button
        type="button"
        onClick={() => {
          const next = createItem()
          onChange([...items, next])
          setOpenId(getItemId(next, items.length))
        }}
        className="w-full rounded-xl border border-dashed border-acll-navy/20 px-4 py-3 text-[14px] font-medium text-acll-green transition-colors hover:border-acll-green/50 hover:bg-acll-green/5"
      >
        + {addLabel}
      </button>
    </div>
  )
}
