'use client'
import SignIn from "@/components/sign-in";
import { signInSchema } from "@/utils/zod/schemas";
import { useState } from "react";
import { z } from "zod";
import { useRouter, useSearchParams } from 'next/navigation'; 
import { loginAction } from "@/actions/auth-action";

type ApiResponse = {
  message?: string;
  status?: number;
  success?: boolean;
};

function LoginContainer() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const [resApi, setResApi] = useState<ApiResponse | undefined>(undefined)

  const onSubmit = async (values : z.infer<typeof signInSchema>) => {
    const res = await loginAction(values)
    console.log(res);
    setResApi(res)
    // Verifica si la respuesta es exitosa y redirige
    if (res.success) {
      setResApi({status: 200, message: "Login correcto, redirigiendo ..."})
      const redirectUrl = searchParams.get('redirect') || '/dashboard'; // Usa el redirect de la URL o '/dashboard' por defecto
      console.log('Redirigiendo a:', redirectUrl); // Agrega este log
      router.push(redirectUrl); // Redirige a la URL deseada
    }
  }

  return (
    <SignIn onSubmit={onSubmit} serverError={resApi?.message} status={resApi?.status}/>
  )
}

export default LoginContainer;
