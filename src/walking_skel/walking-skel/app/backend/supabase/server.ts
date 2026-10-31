import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSupabaseEnv } from './env';

// Supabase client for server code (API routes, Server Actions).
// Create a new one per request: the client carries the session of the user
// whose cookies it reads, so sharing it would mix up users.
export async function createSupabaseServerClient() {
  const { url, publishableKey } = getSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(url, publishableKey, {
    cookies: {
      // Session comes in with the request cookies -> auth.uid() works in the DB
      getAll() {
        return cookieStore.getAll();
      },
      // Login/logout/token refresh write the session cookies back
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Components can't set cookies. Safe to ignore:
          // proxy.ts refreshes the session on every request instead.
        }
      },
    },
  });
}
