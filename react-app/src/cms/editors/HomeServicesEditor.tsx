import { ListEditor } from '@/cms/components/ListEditor'
import { Field, ImagePathInput, TextArea, TextInput } from '@/cms/components/fields'
import type { HomeService } from '@/lib/content/types'

function emptyHomeService(): HomeService {
  return { id: '', title: '', description: '', image: '', linkAnchor: '' }
}

export function HomeServicesEditor({
  value,
  onChange,
}: {
  value: HomeService[]
  onChange: (value: HomeService[]) => void
}) {
  return (
    <ListEditor
      items={value}
      onChange={onChange}
      getItemId={(item) => item.id || 'new-home-service'}
      getItemLabel={(item) => item.title || 'Untitled service'}
      getItemThumbnail={(item) => item.image}
      createItem={emptyHomeService}
      addLabel="Add home service tile"
      renderItem={(item, _index, update) => (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="ID">
            <TextInput value={item.id} onChange={(id) => update({ ...item, id })} />
          </Field>
          <Field label="Link anchor" hint="e.g. #offshore">
            <TextInput
              value={item.linkAnchor}
              onChange={(linkAnchor) => update({ ...item, linkAnchor })}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Title">
              <TextInput value={item.title} onChange={(title) => update({ ...item, title })} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Description">
              <TextArea
                value={item.description}
                onChange={(description) => update({ ...item, description })}
              />
            </Field>
          </div>
          <ImagePathInput value={item.image} onChange={(image) => update({ ...item, image })} />
        </div>
      )}
    />
  )
}
