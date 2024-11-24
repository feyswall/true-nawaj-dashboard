import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const role = token.role;

  if (req.url.includes('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  if (req.url.includes('/hotelManager') && role !== 'hotelManager') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  if (req.url.includes('/aircraftManager') && role !== 'aircraftManager') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/hotelManager/:path*', '/aircraftManager/:path*', '/admin/:path*'],
};
