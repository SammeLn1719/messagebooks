import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token')?.value
  const { pathname } = request.nextUrl

  // Публичные маршруты
  if (pathname.startsWith('/login')) {
    return NextResponse.next()
  }

  // Проверка авторизации
  try {
    const res = await fetch('http://localhost:8080/profile', {
      headers: {
        Cookie: `session_token=${sessionToken}`
      }
    })

    if (!res.ok) {
      throw new Error('Unauthorized')
    }

    const user = await res.json()

    // Проверка админ-прав
    if (pathname.startsWith('/admin') && !user.isAdmin) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
  } catch (err) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*']
}
