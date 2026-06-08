import { ListEditor } from '@/cms/components/ListEditor'
import { Field, TextArea, TextInput } from '@/cms/components/fields'
import type { PageMetaMap } from '@/lib/content/types'

type PageMetaEntry = { path: string; title: string; description: string }

function toEntries(map: PageMetaMap): PageMetaEntry[] {
  return Object.entries(map).map(([path, meta]) => ({
    path,
    title: meta.title,
    description: meta.description,
  }))
}

function fromEntries(entries: PageMetaEntry[]): PageMetaMap {
  return Object.fromEntries(entries.map(({ path, title, description }) => [path, { title, description }]))
}

function emptyEntry(): PageMetaEntry {
  return { path: '/', title: '', description: '' }
}

export function PageMetaEditor({
  value,
  onChange,
}: {
  value: PageMetaMap
  onChange: (value: PageMetaMap) => void
}) {
  const entries = toEntries(value)

  return (
    <ListEditor
      items={entries}
      onChange={(next) => onChange(fromEntries(next))}
      getItemId={(item) => item.path}
      getItemLabel={(item) => `${item.path} — ${item.title || 'No title'}`}
      createItem={emptyEntry}
      addLabel="Add page"
      renderItem={(item, _index, update) => (
        <div className="grid gap-4">
          <Field label="Route path" hint="e.g. /about or /news">
            <TextInput value={item.path} onChange={(path) => update({ ...item, path })} />
          </Field>
          <Field label="Page title">
            <TextInput value={item.title} onChange={(title) => update({ ...item, title })} />
          </Field>
          <Field label="Meta description">
            <TextArea
              value={item.description}
              onChange={(description) => update({ ...item, description })}
              rows={3}
            />
          </Field>
        </div>
      )}
    />
  )
}
