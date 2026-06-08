import { ListEditor } from '@/cms/components/ListEditor'
import { Field, ImagePathInput, TextArea, TextInput } from '@/cms/components/fields'
import type { ServicePageItem } from '@/lib/content/types'

function emptyService(): ServicePageItem {
  return { id: '', name: '', tagline: '', description: '', image: '' }
}

export function ServicesPageEditor({
  value,
  onChange,
}: {
  value: ServicePageItem[]
  onChange: (value: ServicePageItem[]) => void
}) {
  return (
    <ListEditor
      items={value}
      onChange={onChange}
      getItemId={(item) => item.id || 'new-service'}
      getItemLabel={(item) => item.name || 'Untitled service'}
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
            <Field label="Tagline">
              <TextInput value={item.tagline} onChange={(tagline) => update({ ...item, tagline })} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Description">
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
