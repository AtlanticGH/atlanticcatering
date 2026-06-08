import { ListEditor } from '@/cms/components/ListEditor'
import { Field, ImagePathInput, TextArea, TextInput } from '@/cms/components/fields'
import type { Person } from '@/lib/content/types'

function emptyPerson(): Person {
  return { name: '', role: '', bio: '', image: '' }
}

export function PeopleEditor({
  value,
  onChange,
}: {
  value: Person[]
  onChange: (value: Person[]) => void
}) {
  return (
    <ListEditor
      items={value}
      onChange={onChange}
      getItemId={(item) => item.name || 'new-person'}
      getItemLabel={(item) => item.name || 'Untitled person'}
      createItem={emptyPerson}
      addLabel="Add team member"
      renderItem={(item, _index, update) => (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name">
            <TextInput value={item.name} onChange={(name) => update({ ...item, name })} />
          </Field>
          <Field label="Role">
            <TextInput value={item.role} onChange={(role) => update({ ...item, role })} />
          </Field>
          <ImagePathInput value={item.image} onChange={(image) => update({ ...item, image })} />
          <div className="sm:col-span-2">
            <Field label="Bio">
              <TextArea value={item.bio} onChange={(bio) => update({ ...item, bio })} rows={8} />
            </Field>
          </div>
        </div>
      )}
    />
  )
}
