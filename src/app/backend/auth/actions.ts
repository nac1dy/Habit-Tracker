'use server';

import { signIn, signUp, signOut, type AuthResult, type SignUpResult } from './authService';

// Server Actions: the only entry point from the UI into the auth logic.
// Every export here is callable from the browser, so inputs are checked
// before they reach the service. Navigation stays in the pages.

export async function loginAction(email: unknown, password: unknown): Promise<AuthResult> {
  const input = parseCredentials(email, password);
  if (!input) return { ok: false, message: 'Please enter your email and password.' };

  return signIn(input.email, input.password);
}

export async function registerAction(email: unknown, password: unknown): Promise<SignUpResult> {
  const input = parseCredentials(email, password);
  if (!input) return { ok: false, message: 'Please fill in all fields.' };

  return signUp(input.email, input.password);
}

export async function logoutAction(): Promise<AuthResult> {
  return signOut();
}

// Email is trimmed, the password is not: spaces can be part of a password
function parseCredentials(email: unknown, password: unknown) {
  if (typeof email !== 'string' || typeof password !== 'string') return null;

  const trimmedEmail = email.trim();
  if (!trimmedEmail || !password) return null;

  return { email: trimmedEmail, password };
}
