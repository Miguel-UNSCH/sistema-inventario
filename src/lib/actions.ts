'use server'

import {
  personaNaturalSchema,
  supplierSchema,
  roleSchema,
  permissionSchema,
  userSchema
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

// ==================== CRUD PROVEEDORES ==========================

export async function createProveedor(data: z.infer<typeof supplierSchema>) {
  const res = await fetch(`${process.env.HOST_URL}/api/proveedores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Enviar userId
  });

  const resp = await res.json();
  console.log(resp);
  return resp;
}

export async function updateProveedor(id: string, data: z.infer<typeof supplierSchema>) {
  const res = await fetch(`${process.env.HOST_URL}/api/proveedores/${id}`, {
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

export async function deleteProveedor(id: string) {
  const res = await fetch(`${process.env.HOST_URL}/api/proveedores/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resp = await res.json();
  console.log(resp);
  return resp
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

// ==================== CRUD PERMISOS ==========================

export async function createPermission(data: z.infer<typeof permissionSchema>) {
  const res = await fetch(`${process.env.HOST_URL}/api/permisos`, {
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

export async function updatePermission(id: string, data: z.infer<typeof permissionSchema>) {
  const res = await fetch(`${process.env.HOST_URL}/api/permisos/${id}`, {
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

export async function deletePermission(id: string) {
  const res = await fetch(`${process.env.HOST_URL}/api/permisos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resp = await res.json();
  console.log(resp);
  return resp
}

// ==================== CRUD USUARIOS ==========================

export async function createUser(data: z.infer<typeof userSchema>) {
  const res = await fetch(`${process.env.HOST_URL}/api/usuarios`, {
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

export async function updateUser(id: string, data: z.infer<typeof userSchema>) {
  const res = await fetch(`${process.env.HOST_URL}/api/usuarios/${id}`, {
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

export async function deleteUser(id: string) {
  const res = await fetch(`${process.env.HOST_URL}/api/usuarios/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resp = await res.json();
  console.log(resp);
  return resp
}