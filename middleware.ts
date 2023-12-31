import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { i18n } from './i18n.config'

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one
  if (['/manifest.json', '/sw.js', '/icon-192x192.png', '/icon-256x256.png', '/icon-384x384.png',
   '/icon-512x512.png', '/UA.png','/GB.png','/DE.png','/FR.png','/PL.png','/bg.mp4', '/features.json',
   '/landing-note.jpg', '/landing-phone.jpg', '/icons/mobile.png', '/icons/computer.png', '/icons/chat-text.png',
    '/icons/picture.png', '/icons/notify-heart.png', '/icons/likes.png', '/icons/albums.png', '/icons/groups.png',
    '/icons/lock.png', '/icons/photo.png', '/icons/fire.png']
   
  .includes(pathname) || pathname.includes('/workbox-') || pathname.includes('/worker-')) return

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}