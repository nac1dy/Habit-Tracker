import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/app/backend/supabase/session';

const PUBLIC_PAGES = ['/login', '/register'];

// Decides who may open which page. The session handling itself lives in updateSession.
export async function proxy(request: NextRequest) {
  const { response, isLoggedIn } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // API routes answer with their own status code, a redirect would hand HTML to fetch.
  // Server Actions are POST requests and must not be redirected either.
  if (pathname.startsWith('/api/') || request.method !== 'GET') return response;

  const isPublicPage = PUBLIC_PAGES.includes(pathname);

  if (!isLoggedIn && !isPublicPage) return redirectTo('/login', request, response);
  if (isLoggedIn && isPublicPage) return redirectTo('/', request, response);

  return response;
}

// Keeps refreshed session cookies, otherwise the browser would lose them on a redirect.
// Their cache headers come along, so no CDN can serve a session to someone else.
function redirectTo(path: string, request: NextRequest, sessionResponse: NextResponse) {
  const redirect = NextResponse.redirect(new URL(path, request.url));
  sessionResponse.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
  ['cache-control', 'expires', 'pragma'].forEach((name) => {
    const value = sessionResponse.headers.get(name);
    if (value) redirect.headers.set(name, value);
  });
  return redirect;
}

// Static files and the PWA files have to load without a login
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|service-worker.js|.*\\.(?:png|svg|ico)$).*)',
  ],
};
