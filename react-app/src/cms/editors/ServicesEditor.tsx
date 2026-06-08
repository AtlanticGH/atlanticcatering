import { ListEditor } from '@/cms/components/ListEditor'
import { Field, ImagePathInput, TextArea, TextInput } from '@/cms/components/fields'
import type { ServiceItem } from '@/lib/content/types'

function emptyService(): ServiceItem {
  return { id: '', name: '', tagline: '', description: '', image: '' }
}

export function ServicesEditor({
  value,
  onChange,
}: {
  value: ServiceItem[]
  onChange: (value: ServiceItem[]) => void
}) {
  return (
    <ListEditor
      items={value}
      onChange={onChange}
      getItemId={(item) => item.id || 'new-service'}
      getItemLabel={(item) => item.name || 'Untitled service'}
      getItemThumbnail={(item) => item.image}
      createItem={emptyService}
      addLabel="Add service"
      renderItem={(item, _index, update) => (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="ID" hint="Used for anchor links, e.g. offshore">
            <TextInput value={item.id} onChange={(id) => update({ ...item, id })} />
          </Field>
          <Field label="Name">
            <TextInput value={item.name} onChange={(name) => update({ ...item, name })} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Tagline" hint="Short line — shown on home scroll and service cards">
              <TextInput value={item.tagline} onChange={(tagline) => update({ ...item, tagline })} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Description" hint="Full description — shown in the service detail modal">
              <TextArea
                value={item.description}
                onChange={(description) => update({ ...item, description })}
                rows={4}
              />
            </Field>
          </div>
          <ImagePathInput value={item.image} onChange={(image) => update({ ...item, image })} />
        </div>
      )}
    />
  )
}
