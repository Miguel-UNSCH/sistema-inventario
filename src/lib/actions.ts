'use server'

import { personaNaturalSchema, productSchema } from "@/utils/zod/schemas";
import { z } from "zod";

export async function createPersonaNatural(data: z.infer<typeof personaNaturalSchema>) {
  const res = await fetch(`${process.env.HOST_URL}/api/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resp = await res.json();
  console.log(resp);
  return resp;
}

export async function createProduct(data: z.infer<typeof productSchema>) {
  const res = await fetch(`${process.env.HOST_URL}/api/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resp = await res.json();
  console.log(resp);
}