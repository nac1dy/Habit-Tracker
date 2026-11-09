// Reads the Supabase settings in one place, so the clients don't each touch
// process.env and a missing value fails with a clear message instead of a
// cryptic crash inside the Supabase library.
export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      'Missing Supabase config: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env'
    );
  }

  return { url, publishableKey };
}
