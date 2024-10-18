// import { getToken } from "next-auth/jwt";
// import { NextResponse, NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   console.log("Cookies:", req.cookies); // Verifica las cookies
//   const token = await getToken({ req, secret: process.env.AUTH_SECRET });
//   console.log("Token:", token);

//   if (!token) {
//     const loginUrl = new URL('/login', req.url);
//     loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }


// export const config = {
//   matcher: ['/dashboard/:path*'],
// };

// import NextAuth from "next-auth"
// import authConfig from "./auth.config"
 
// export const { auth: middleware } = NextAuth(authConfig)


import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export async function middleware(req: NextRequest) {
  const session = await auth();
  
  // Si no hay sesión, redirigir a la página de login con callbackUrl
  if (!session) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname); // Mantener la URL original
    return NextResponse.redirect(loginUrl);
  }

  // Aquí puedes verificar si la sesión ha expirado y manejarlo
  if (new Date(session.expires) < new Date()) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
