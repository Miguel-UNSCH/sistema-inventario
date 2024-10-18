// types/next-auth.d.ts

import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;  // Asegúrate de incluir el ID aquí
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;  // Asegúrate de incluir el ID aquí también
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;  // Asegúrate de incluir el ID aquí
    role?: string;
  }
}
