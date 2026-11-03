import type { AuthError } from '@supabase/supabase-js';
import { createSupabaseServerClient } from '@/app/backend/supabase/server';

// Auth business logic: talks to Supabase Auth and turns its errors into
// messages the UI can show directly. No React, no HTTP. The UI reaches this
// only through actions.ts.

export type AuthResult = { ok: true } | { ok: false; message: string };
export type SignUpResult =
  | { ok: true; needsEmailConfirmation: boolean }
  | { ok: false; message: string };

export const MIN_PASSWORD_LENGTH = 8;

export async function signIn(email: string, password: string): Promise<AuthResult> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  // On success the session cookies are already set by the server client
  return error ? { ok: false, message: toUserMessage(error) } : { ok: true };
}

export async function signUp(email: string, password: string): Promise<SignUpResult> {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      ok: false,
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return { ok: false, message: toUserMessage(error) };

  // "Confirm email" is on: no session until the user clicks the link in the mail
  return { ok: true, needsEmailConfirmation: !data.session };
}

export async function signOut(): Promise<AuthResult> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  return error ? { ok: false, message: toUserMessage(error) } : { ok: true };
}

// Maps Supabase error codes to text for the user. Login errors stay generic on
// purpose, so nobody can find out which emails have an account.
function toUserMessage(error: AuthError): string {
  switch (error.code) {
    case 'invalid_credentials':
      return 'Email or password is incorrect.';
    case 'email_not_confirmed':
      return 'Please confirm your email first. Check your inbox for the link.';
    case 'user_already_exists':
    case 'email_exists':
      return 'An account with this email already exists.';
    case 'weak_password':
      return 'This password is too weak. Please choose a stronger one.';
    case 'email_address_invalid':
      return 'Please enter a valid email address.';
    case 'over_email_send_rate_limit':
    case 'over_request_rate_limit':
      return 'Too many attempts. Please wait a moment and try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
}
