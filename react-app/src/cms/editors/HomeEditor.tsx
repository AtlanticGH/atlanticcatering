import { Field, StringListEditor, TextArea, TextInput } from '@/cms/components/fields'
import type { HomeContent } from '@/lib/content/types'

export function HomeEditor({
  value,
  onChange,
}: {
  value: HomeContent
  onChange: (value: HomeContent) => void
}) {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-acll-navy">Hero</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title line 1">
            <TextInput
              value={value.hero.titleLine1}
              onChange={(titleLine1) => onChange({ ...value, hero: { ...value.hero, titleLine1 } })}
            />
          </Field>
          <Field label="Title line 2">
            <TextInput
              value={value.hero.titleLine2}
              onChange={(titleLine2) => onChange({ ...value, hero: { ...value.hero, titleLine2 } })}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Subtitle">
              <TextArea
                value={value.hero.subtitle}
                onChange={(subtitle) => onChange({ ...value, hero: { ...value.hero, subtitle } })}
              />
            </Field>
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-acll-navy">Who we are</h3>
        <div className="space-y-4">
          <Field label="Intro paragraph">
            <TextArea
              value={value.whoWeAre.intro}
              onChange={(intro) => onChange({ ...value, whoWeAre: { ...value.whoWeAre, intro } })}
              rows={4}
            />
          </Field>
          <StringListEditor
            label="Bullet points"
            items={value.whoWeAre.bullets}
            onChange={(bullets) => onChange({ ...value, whoWeAre: { ...value.whoWeAre, bullets } })}
            addLabel="Add bullet"
          />
        </div>
      </section>
    </div>
  )
}
