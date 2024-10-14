"use client"
import { useSession } from "next-auth/react"

function Page() {

  const { data: session } = useSession()

  console.log(session);

  return (
    <>
      Cuenta
    </>
  )
}

export default Page;
