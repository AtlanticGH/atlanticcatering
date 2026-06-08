import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { createClient } from '@supabase/supabase-js'

const contentDir = join(import.meta.dirname, '../content')
const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Set SUPABASE_URL (or VITE_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

const files = readdirSync(contentDir).filter((name) => name.endsWith('.json'))

for (const file of files) {
  const id = file.replace(/\.json$/, '')
  const data = JSON.parse(readFileSync(join(contentDir, file), 'utf8'))

  const { error } = await supabase.from('site_content').upsert({
    id,
    data,
    updated_at: new Date().toISOString(),
  })

  if (error) {
    console.error(`Failed to seed ${id}:`, error.message)
    process.exit(1)
  }

  console.log(`Seeded ${id}`)
}

console.log(`Done. Seeded ${files.length} collections.`)
