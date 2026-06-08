import { ListEditor } from '@/cms/components/ListEditor'
import { Field, NumberInput, TextInput } from '@/cms/components/fields'
import type { StatItem } from '@/lib/content/types'

function emptyStat(): StatItem {
  return { target: 0, label: '' }
}

export function StatsEditor({
  value,
  onChange,
}: {
  value: StatItem[]
  onChange: (value: StatItem[]) => void
}) {
  return (
    <ListEditor
      items={value}
      onChange={onChange}
      getItemId={(_item, index) => `stat-${index}`}
      getItemLabel={(item) => item.label || 'Untitled stat'}
      createItem={emptyStat}
      addLabel="Add stat"
      renderItem={(item, _index, update) => (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Target number">
            <NumberInput value={item.target} onChange={(target) => update({ ...item, target })} />
          </Field>
          <Field label="Label">
            <TextInput value={item.label} onChange={(label) => update({ ...item, label })} />
          </Field>
          <Field label="Prefix (optional)" hint="e.g. $">
            <TextInput
              value={item.prefix ?? ''}
              onChange={(prefix) => update({ ...item, prefix: prefix || undefined })}
            />
          </Field>
          <Field label="Suffix (optional)" hint="e.g. M+">
            <TextInput
              value={item.suffix ?? ''}
              onChange={(suffix) => update({ ...item, suffix: suffix || undefined })}
            />
          </Field>
        </div>
      )}
    />
  )
}
