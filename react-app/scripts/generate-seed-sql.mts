import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const contentDir = join(import.meta.dirname, '../content')
const outputPath = resolve(import.meta.dirname, '../../supabase/seed.sql')

const files = readdirSync(contentDir).filter((name) => name.endsWith('.json'))
const lines = ['-- Auto-generated seed for site_content', '']

for (const file of files) {
  const id = file.replace(/\.json$/, '')
  const data = readFileSync(join(contentDir, file), 'utf8').trim()
  const escaped = data.replace(/'/g, "''")
  lines.push(
    `insert into public.site_content (id, data) values ('${id}', '${escaped}'::jsonb)`,
    'on conflict (id) do update set data = excluded.data, updated_at = now();',
    '',
  )
}

writeFileSync(outputPath, `${lines.join('\n')}\n`)
console.log(`Wrote ${outputPath} (${files.length} collections)`)
