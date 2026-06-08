import { useState } from 'react'

export function JsonEditor({
  value,
  onChange,
}: {
  value: unknown
  onChange: (value: unknown) => void
}) {
  const [text, setText] = useState(() => JSON.stringify(value, null, 2))
  const [parseError, setParseError] = useState('')

  function handleChange(nextText: string) {
    setText(nextText)
    try {
      onChange(JSON.parse(nextText))
      setParseError('')
    } catch {
      setParseError('Invalid JSON — fix syntax before saving')
    }
  }

  return (
    <div>
      <p className="mb-3 text-[14px] leading-relaxed text-acll-muted">
        Advanced JSON editor for complex nested content. Edit carefully — invalid JSON cannot be saved.
      </p>
      <textarea
        value={text}
        onChange={(event) => handleChange(event.target.value)}
        className="min-h-[520px] w-full rounded-lg border border-acll-navy/15 bg-acll-gray/20 p-4 font-mono text-xs leading-relaxed text-acll-navy outline-none transition-colors focus:border-acll-green focus:ring-2 focus:ring-acll-green/15"
        spellCheck={false}
      />
      {parseError ? (
        <p className="mt-2 text-[14px] text-red-600 border-l-2 border-red-500 pl-3" role="alert">
          {parseError}
        </p>
      ) : null}
    </div>
  )
}
