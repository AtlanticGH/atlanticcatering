import { ListEditor } from '@/cms/components/ListEditor'
import { Field, ImagePathInput, TextInput } from '@/cms/components/fields'
import type { ClientLogo } from '@/lib/content/types'

function emptyLogo(): ClientLogo {
  return { src: '', alt: '' }
}

function LogoRowEditor({
  label,
  items,
  onChange,
}: {
  label: string
  items: ClientLogo[]
  onChange: (items: ClientLogo[]) => void
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-acll-navy">{label}</h3>
      <ListEditor
        items={items}
        onChange={onChange}
        getItemId={(item, index) => `${item.alt || 'logo'}-${index}`}
        getItemLabel={(item) => item.alt || 'Untitled logo'}
        createItem={emptyLogo}
        addLabel="Add logo"
        renderItem={(item, _index, update) => (
          <div className="grid gap-4 sm:grid-cols-2">
            <ImagePathInput value={item.src} onChange={(src) => update({ ...item, src })} />
            <Field label="Alt text">
              <TextInput value={item.alt} onChange={(alt) => update({ ...item, alt })} />
            </Field>
          </div>
        )}
      />
    </div>
  )
}

export function ClientsEditor({
  value,
  onChange,
}: {
  value: { row1: ClientLogo[]; row2: ClientLogo[] }
  onChange: (value: { row1: ClientLogo[]; row2: ClientLogo[] }) => void
}) {
  return (
    <div className="space-y-8">
      <LogoRowEditor
        label="Marquee row 1"
        items={value.row1}
        onChange={(row1) => onChange({ ...value, row1 })}
      />
      <LogoRowEditor
        label="Marquee row 2"
        items={value.row2}
        onChange={(row2) => onChange({ ...value, row2 })}
      />
    </div>
  )
}
