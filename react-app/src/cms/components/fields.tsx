import type { ReactNode } from 'react'

export const fieldInputClass =
  'w-full rounded-lg border border-acll-navy/15 bg-white px-3 py-2.5 text-[15px] text-acll-navy outline-none transition-colors placeholder:text-acll-muted/50 focus:border-acll-green focus:ring-2 focus:ring-acll-green/15'

export function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-medium text-acll-navy">{label}</span>
      {hint ? <span className="mt-0.5 block text-[12px] text-acll-muted">{hint}</span> : null}
      <div className="mt-1.5">{children}</div>
    </label>
  )
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'email' | 'url'
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={fieldInputClass}
    />
  )
}

export function NumberInput({
  value,
  onChange,
}: {
  value: number
  onChange: (value: number) => void
}) {
  return (
    <input
      type="number"
      value={Number.isFinite(value) ? value : 0}
      onChange={(event) => onChange(Number(event.target.value))}
      className={fieldInputClass}
    />
  )
}

export function TextArea({
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  rows?: number
  placeholder?: string
}) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      rows={rows}
      placeholder={placeholder}
      className={`${fieldInputClass} resize-y`}
    />
  )
}

export function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={fieldInputClass}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export function ImagePathInput({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <Field label="Image path" hint="Relative path, e.g. images/DSC04606.jpg">
      <TextInput value={value} onChange={onChange} placeholder="images/..." />
    </Field>
  )
}

export function StringListEditor({
  label,
  hint,
  items,
  onChange,
  addLabel = 'Add item',
}: {
  label: string
  hint?: string
  items: string[]
  onChange: (items: string[]) => void
  addLabel?: string
}) {
  function updateItem(index: number, value: string) {
    onChange(items.map((item, i) => (i === index ? value : item)))
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-2">
      <Field label={label} hint={hint}>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex gap-2">
              <TextArea
                value={item}
                onChange={(value) => updateItem(index, value)}
                rows={2}
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="shrink-0 self-start rounded-lg border border-acll-navy/10 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange([...items, ''])}
            className="rounded-lg border border-dashed border-acll-navy/20 px-3 py-2 text-xs font-medium text-acll-green hover:border-acll-green/50 hover:bg-acll-green/5"
          >
            + {addLabel}
          </button>
        </div>
      </Field>
    </div>
  )
}
