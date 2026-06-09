import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { isSupabaseConfigured, SUPABASE_ANON_KEY, SUPABASE_URL } from '@/lib/supabase/config'

let client: SupabaseClient | null = null

export { isSupabaseConfigured }

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        fetch: (url, options = {}) =>
          fetch(url, {
            ...options,
            cache: 'no-store',
          }),
      },
    })
  }
  return client
}
