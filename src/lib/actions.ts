'use server'

import { 
  personaNaturalSchema, 
  productSchema, 
  roleSchema 
} from "@/utils/zod/schemas";
import { z } from "zod";

// ==================== CRUD CLIENTES ==========================

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

// ==================== CRUD PRODUCTOS ==========================

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

// ==================== CRUD ROLES ==========================

export async function createRole(data: z.infer<typeof roleSchema>) {
  const res = await fetch(`${process.env.HOST_URL}/api/roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resp = await res.json();
  console.log(resp);
  return resp
}

export async function updateRole(id: string, data: z.infer<typeof roleSchema>) {
  const res = await fetch(`${process.env.HOST_URL}/api/roles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resp = await res.json();
  console.log(resp);
  return resp
}

export async function deleteRole(id: string) {
  const res = await fetch(`${process.env.HOST_URL}/api/roles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resp = await res.json();
  console.log(resp);
  return resp
}