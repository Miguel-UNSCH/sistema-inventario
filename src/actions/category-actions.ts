"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { formatDateTime } from "@/lib/format-date";

import { categorySchema } from "@/utils/zod/schemas";
import { z } from "zod";

// ==================== CRUD PRODUCTOS ==========================

export async function getCategories() {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "categorias" && perm.action === "leer");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para ver las categorias", status: 500 };
    }

    const categories = await db.categoria.findMany();

    // Formatear los datos antes de devolver la respuesta
    const formattedData = categories.map((category) => ({
        id: category.id,
        category: category.category,
        description: category.description,
        createdAt: formatDateTime(category.createdAt),
        updatedAt: formatDateTime(category.updatedAt),
      }));

    return formattedData;
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function createCategory(data: z.infer<typeof categorySchema>) {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "categorias" && perm.action === "crear");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para crear categorias", status: 500 };
    }

    const nameCategory = await db.categoria.findUnique({
      where: {
        category: data.category,
      },
    });

    if (nameCategory) {
      return { message: "La categoria ya existe", status: 400 };
    }

    await db.categoria.create({
      data: {
        category: data.category,
        description: data.description,
      },
    });

    return { message: "La categoria se ha creado con éxito", status: 200 };
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function updateCategory(id: string, data: z.infer<typeof categorySchema>) {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "categorias" && perm.action === "actualizar");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para actualizar las categorias", status: 500 };
    }

    const categoryFound = await db.categoria.findFirst({
      where: {
        id: id,
      },
    });

    if (!categoryFound) {
      return { message: "La categoria no existe", status: 400 };
    }

    await db.categoria.update({
      where: {
        id: id,
      },
      data: {
        category: data.category,
        description: data.description,
      },
    });

    return { message: "Categoria actualizada con éxito", status: 200 };
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function deleteCategory(id: string) {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "categorias" && perm.action === "eliminar");

    console.log(hasPermissionToCreate);

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para eliminar las categorias", status: 500 };
    }

    await db.categoria.delete({
      where: {
        id: id,
      },
    });

    return { message: "Categoria eliminada con éxito", status: 200 };
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function getCategoriesWithoutPermissions() {
  try {
    const categories = await db.categoria.findMany();

    // Formatear los datos antes de devolver la respuesta
    const formattedData = categories.map((category) => ({
        id: category.id,
        category: category.category,
        description: category.description,
        createdAt: formatDateTime(category.createdAt),
        updatedAt: formatDateTime(category.updatedAt),
      }));

    return formattedData;
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}