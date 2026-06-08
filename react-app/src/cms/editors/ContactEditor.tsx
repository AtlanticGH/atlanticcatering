import { Field, TextArea, TextInput } from '@/cms/components/fields'
import type { ContactContent } from '@/lib/content/types'

export function ContactEditor({
  value,
  onChange,
}: {
  value: ContactContent
  onChange: (value: ContactContent) => void
}) {
  function update<K extends keyof ContactContent>(key: K, next: ContactContent[K]) {
    onChange({ ...value, [key]: next })
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Email">
        <TextInput type="email" value={value.email} onChange={(email) => update('email', email)} />
      </Field>
      <Field label="Email note">
        <TextInput value={value.emailNote} onChange={(emailNote) => update('emailNote', emailNote)} />
      </Field>
      <Field label="Phone display">
        <TextInput value={value.phone} onChange={(phone) => update('phone', phone)} />
      </Field>
      <Field label="Phone href" hint="Digits only for tel: link">
        <TextInput value={value.phoneHref} onChange={(phoneHref) => update('phoneHref', phoneHref)} />
      </Field>
      <Field label="Phone note">
        <TextInput value={value.phoneNote} onChange={(phoneNote) => update('phoneNote', phoneNote)} />
      </Field>
      <Field label="Careers email">
        <TextInput
          type="email"
          value={value.careersEmail}
          onChange={(careersEmail) => update('careersEmail', careersEmail)}
        />
      </Field>
      <Field label="Location">
        <TextInput value={value.location} onChange={(location) => update('location', location)} />
      </Field>
      <Field label="City">
        <TextInput value={value.city} onChange={(city) => update('city', city)} />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Google Maps embed URL">
          <TextArea
            value={value.mapEmbedUrl}
            onChange={(mapEmbedUrl) => update('mapEmbedUrl', mapEmbedUrl)}
            rows={3}
          />
        </Field>
      </div>
    </div>
  )
}
