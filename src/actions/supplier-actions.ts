"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { formatDateTime } from "@/lib/format-date";

import { supplierSchema } from "@/utils/zod/schemas";
import { z } from "zod";

// ==================== CRUD PRODUCTOS ==========================

export async function getSuppliers() {
  try {
    const session = await auth();

    if (!session) {
      return { message: "No existe sessión activa", status: 500 };
    }

    const userWithRole = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        role: true,
      },
    });

    if (!userWithRole || !userWithRole.roleId) {
      return { message: "El usuario no tiene un rol asignado", status: 400 };
    }

    // Obtener los permisos asociados al roleId del usuario
    const permissions = await db.permission.findMany({
      where: {
        roleId: userWithRole.roleId,
      },
      select: {
        module: true,
        action: true,
      },
    });

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "proveedores" && perm.action === "leer");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para ver los proveedores", status: 500 };
    }

    const suppliers = await db.proveedor.findMany();

    // Formatear los datos antes de devolver la respuesta
    const formattedData = suppliers.map((supplier) => ({
        id: supplier.id,
        supplierName: supplier.supplierName,
        ruc: supplier.ruc,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        createdAt: formatDateTime(supplier.createdAt),
        updatedAt: formatDateTime(supplier.updatedAt),
    }));

    return formattedData;
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function createSupplier(data: z.infer<typeof supplierSchema>) {
  try {
    const session = await auth();

    if (!session) {
      return { message: "No existe sessión activa", status: 500 };
    }

    const userWithRole = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        role: true,
      },
    });

    if (!userWithRole || !userWithRole.roleId) {
      return { message: "El usuario no tiene un rol asignado", status: 400 };
    }

    // Obtener los permisos asociados al roleId del usuario
    const permissions = await db.permission.findMany({
      where: {
        roleId: userWithRole.roleId,
      },
      select: {
        module: true,
        action: true,
      },
    });

    console.log("Permisos del usuario:", permissions);

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "proveedores" && perm.action === "crear");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para crear proveedores", status: 500 };
    }

    const rucSupplier = await db.proveedor.findUnique({
      where: {
        ruc: data.ruc
      },
    });

    if (rucSupplier) {
      return { message: "El proveedor ya existe", status: 400 };
    }

    await db.proveedor.create({
      data: {
        supplierName: data.supplierName,
        ruc: data.ruc,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
    });

    return { message: "Proveedor creado con éxito", status: 200 };
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function updateSupplier(id: string, data: z.infer<typeof supplierSchema>) {
  try {
    const session = await auth();

    if (!session) {
      return { message: "No existe sessión activa", status: 500 };
    }

    const userWithRole = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        role: true,
      },
    });

    if (!userWithRole || !userWithRole.roleId) {
      return { message: "El usuario no tiene un rol asignado", status: 400 };
    }

    // Obtener los permisos asociados al roleId del usuario
    const permissions = await db.permission.findMany({
      where: {
        roleId: userWithRole.roleId,
      },
      select: {
        module: true,
        action: true,
      },
    });

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "proveedores" && perm.action === "actualizar");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para actualizar los proveedores", status: 500 };
    }

    const supplierFound = await db.proveedor.findFirst({
      where: {
        id: id,
      },
    });

    if (!supplierFound) {
      return { message: "El proveedor no existe", status: 400 };
    }

    await db.proveedor.update({
      where: {
        id: id,
      },
      data: {
        supplierName: data.supplierName,
        ruc: data.ruc,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
    });

    return { message: "Proveedor actualizado con éxito", status: 200 };
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function deleteSupplier(id: string) {
  try {
    const session = await auth();

    if (!session) {
      return { message: "No existe sessión activa", status: 500 };
    }

    const userWithRole = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        role: true,
      },
    });

    if (!userWithRole || !userWithRole.roleId) {
      return { message: "El usuario no tiene un rol asignado", status: 400 };
    }

    // Obtener los permisos asociados al roleId del usuario
    const permissions = await db.permission.findMany({
      where: {
        roleId: userWithRole.roleId,
      },
      select: {
        module: true,
        action: true,
      },
    });

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "proveedores" && perm.action === "eliminar");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para eliminar los proveedores", status: 500 };
    }

    await db.proveedor.delete({
      where: {
        id: id,
      },
    });

    return { message: "proveedor eliminado con éxito", status: 200 };
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function getSupplierWithoutPermissions() {
  try {
    const suppliers = await db.proveedor.findMany();

    // Formatear los datos antes de devolver la respuesta
    const formattedData = suppliers.map((supplier) => ({
        id: supplier.id,
        supplierName: supplier.supplierName,
        ruc: supplier.ruc,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        createdAt: formatDateTime(supplier.createdAt),
        updatedAt: formatDateTime(supplier.updatedAt),
    }));

    return formattedData;
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}