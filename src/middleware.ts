import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // Si no hay token, redirigir a la página de login
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname); // Agregar la URL original

    return NextResponse.redirect(loginUrl);
  }

  // Si el token existe, permitir el acceso
  return NextResponse.next();
}

// Configuración del matcher para proteger ciertas rutas
export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
};