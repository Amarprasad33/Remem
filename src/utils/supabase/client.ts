import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.SUPABSE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )
}