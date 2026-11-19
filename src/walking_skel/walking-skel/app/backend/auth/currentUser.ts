import { createSupabaseServerClient } from '@/app/backend/supabase/server';

// Returns the session client and the verified user id, or null without a valid session.
// The id comes from the checked token and never from the request, so nobody can claim
// to be someone else by sending a different id.
export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  return userId ? { supabase, userId } : null;
}
