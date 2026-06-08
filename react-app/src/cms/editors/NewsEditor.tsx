import { ListEditor } from '@/cms/components/ListEditor'
import {
  Field,
  ImagePathInput,
  NumberInput,
  SelectInput,
  StringListEditor,
  TextArea,
  TextInput,
} from '@/cms/components/fields'
import type { NewsArticle, NewsCategoryKey } from '@/lib/content/types'

const categoryOptions: { value: NewsCategoryKey; label: string }[] = [
  { value: 'award', label: 'Award' },
  { value: 'milestone', label: 'Milestone' },
  { value: 'recognition', label: 'Recognition' },
]

const collageOptions = [
  { value: 'large', label: 'Large' },
  { value: 'small', label: 'Small' },
  { value: 'offset', label: 'Offset' },
]

function emptyArticle(): NewsArticle {
  return {
    slug: '',
    category: 'Award',
    categoryKey: 'award',
    title: '',
    excerpt: '',
    image: '',
    imageAlt: '',
    year: new Date().getFullYear(),
    body: [''],
    collageVariant: 'large',
    collageTitle: '',
    collageExcerpt: '',
    collageImage: '',
  }
}

export function NewsEditor({
  value,
  onChange,
}: {
  value: NewsArticle[]
  onChange: (value: NewsArticle[]) => void
}) {
  return (
    <ListEditor
      items={value}
      onChange={onChange}
      getItemId={(item) => item.slug || 'new-article'}
      getItemLabel={(item) => item.title || 'Untitled article'}
      getItemThumbnail={(item) => item.image || item.collageImage}
      createItem={emptyArticle}
      addLabel="Add article"
      renderItem={(item, _index, update) => (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Slug" hint="URL path: /news/your-slug">
            <TextInput value={item.slug} onChange={(slug) => update({ ...item, slug })} />
          </Field>
          <Field label="Year">
            <NumberInput value={item.year} onChange={(year) => update({ ...item, year })} />
          </Field>
          <Field label="Category label">
            <TextInput value={item.category} onChange={(category) => update({ ...item, category })} />
          </Field>
          <Field label="Category key">
            <SelectInput
              value={item.categoryKey}
              onChange={(categoryKey) =>
                update({ ...item, categoryKey: categoryKey as NewsCategoryKey })
              }
              options={categoryOptions}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Title">
              <TextInput value={item.title} onChange={(title) => update({ ...item, title })} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Excerpt">
              <TextArea value={item.excerpt} onChange={(excerpt) => update({ ...item, excerpt })} />
            </Field>
          </div>
          <ImagePathInput value={item.image} onChange={(image) => update({ ...item, image })} />
          <Field label="Image alt text">
            <TextInput value={item.imageAlt} onChange={(imageAlt) => update({ ...item, imageAlt })} />
          </Field>
          <div className="sm:col-span-2">
            <StringListEditor
              label="Article body"
              hint="One paragraph per block"
              items={item.body}
              onChange={(body) => update({ ...item, body })}
              addLabel="Add paragraph"
            />
          </div>
          <Field label="Collage variant">
            <SelectInput
              value={item.collageVariant}
              onChange={(collageVariant) =>
                update({ ...item, collageVariant: collageVariant as NewsArticle['collageVariant'] })
              }
              options={collageOptions}
            />
          </Field>
          <Field label="Collage title">
            <TextInput
              value={item.collageTitle}
              onChange={(collageTitle) => update({ ...item, collageTitle })}
            />
          </Field>
          <Field label="Collage excerpt">
            <TextInput
              value={item.collageExcerpt}
              onChange={(collageExcerpt) => update({ ...item, collageExcerpt })}
            />
          </Field>
          <ImagePathInput
            value={item.collageImage}
            onChange={(collageImage) => update({ ...item, collageImage })}
          />
        </div>
      )}
    />
  )
}
