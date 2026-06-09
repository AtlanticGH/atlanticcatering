/**
 * Public Supabase project config (anon key is safe to expose in the browser).
 * Env vars take precedence; defaults keep the live site on Supabase when Vercel
 * env vars are missing at build time.
 */
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ?? 'https://wnkmjyulvsbcyzdykhny.supabase.co'

export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indua21qeXVsdnNiY3l6ZHlraG55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTYwMDMsImV4cCI6MjA5NjQ5MjAwM30.wtxrG8bXKULPr58oj8BpVBis9LBBbHIfWgBb4d5i1zY'

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
}
