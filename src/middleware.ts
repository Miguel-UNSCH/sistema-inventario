// import NextAuth from "next-auth";
// import { NextResponse } from "next/server";
// import authConfig from "./auth.config";

// const { auth } = NextAuth(authConfig);

// const publicRoutes = ["/", "/api"];
// const authRoutes = ["/login"];
// const apiAuthPrefix = "/api/auth";

// export default auth((req) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;

//   console.log({ isLoggedIn, path: nextUrl.pathname });

//   // Permitir todas las rutas de API de autenticación
//   if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
//     return NextResponse.next();
//   }

//   // Permitir acceso a rutas públicas sin importar el estado de autenticación
//   if (publicRoutes.includes(nextUrl.pathname)) {
//     return NextResponse.next();
//   }

//   // Redirigir a /dashboard si el usuario está logueado y trata de acceder a rutas de autenticación
//   if (isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
//     return NextResponse.redirect(new URL("/dashboard", nextUrl));
//   }

//   // Redirigir a /login si el usuario no está logueado y trata de acceder a una ruta protegida
//   if (
//     !isLoggedIn &&
//     !authRoutes.includes(nextUrl.pathname) &&
//     !publicRoutes.includes(nextUrl.pathname)
//   ) {
//     const callbackUrl = encodeURIComponent(nextUrl.pathname);
//     return NextResponse.redirect(
//       new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl)
//     );
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };


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
    '/profile/:path*',
  ],
};
