"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { z } from "zod";
import { formatDateTime } from "@/lib/format-date";
import { permissionSchema } from "@/utils/zod/schemas";

export async function getPermissions() {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "roles" && perm.action === "leer");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para ver los roles", status: 500 };
    }

    const permissionsFound = await db.permission.findMany({
      include: {
        role: {
          select: {
            name: true, 
          },
        },
      },
    });

    // Formatear los datos antes de devolver la respuesta
    const formattedData = permissionsFound.map((permission) => ({
      id: permission.id,
      action: permission.action,
      module: permission.module,
      role: permission.role.name,
      roleId: permission.roleId,
      createdAt: formatDateTime(permission.createdAt),
      updatedAt: formatDateTime(permission.updatedAt),
    }));

    return formattedData
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function createPermission(data: z.infer<typeof permissionSchema>) {
  try {
    const session = await auth();

    console.log("session", session)

    if (!session) {
      return { message: "No existe sesión activa", status: 500 };
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

    // Verificar permisos para crear en el módulo "permissions"
    const permissions = await db.permission.findMany({
      where: {
        roleId: userWithRole.roleId,
      },
      select: {
        module: true,
        action: true,
      },
    });

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "roles" && perm.action === "crear");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para crear permisos", status: 500 };
    }

    // Crear el nuevo permiso
    await db.permission.create({
      data: {
        roleId: data.roleId,
        module: data.module,
        action: data.action,
      },
    });

    return { message: "El permiso ha sido creado con éxito", status: 200 };
  } catch (error) {
    return { message: "Error al crear el permiso: " + error, status: 500 };
  }
}

export async function updatePermission(permissionId: string, data: z.infer<typeof permissionSchema>) {
  try {
    const session = await auth();

    if (!session) {
      return { message: "No existe sesión activa", status: 500 };
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

    // Verificar permisos para editar en el módulo "permissions"
    const permissions = await db.permission.findMany({
      where: {
        roleId: userWithRole.roleId,
      },
      select: {
        module: true,
        action: true,
      },
    });

    const hasPermissionToEdit = permissions.some((perm) => perm.module === "roles" && perm.action === "actualizar");

    if (!hasPermissionToEdit) {
      return { message: "No tienes permiso para editar permisos", status: 500 };
    }

    // Verificar que el permiso a actualizar exista
    const permission = await db.permission.findUnique({
      where: { id: permissionId },
    });

    if (!permission) {
      return { message: "El permiso especificado no existe", status: 404 };
    }

    // Actualizar el permiso
    await db.permission.update({
      where: { id: permissionId },
      data: {
        module: data.module,
        action: data.action,
      },
    });

    return { message: "El permiso ha sido actualizado con éxito", status: 200 };
  } catch (error) {
    return { message: "Error al actualizar el permiso: " + error, status: 500 };
  }
}

export async function deletePermission(permissionId: string) {
  try {
    const session = await auth();

    if (!session) {
      return { message: "No existe sesión activa", status: 500 };
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

    // Verificar permisos para eliminar en el módulo "permissions"
    const permissions = await db.permission.findMany({
      where: {
        roleId: userWithRole.roleId,
      },
      select: {
        module: true,
        action: true,
      },
    });

    const hasPermissionToDelete = permissions.some((perm) => perm.module === "roles" && perm.action === "eliminar");

    if (!hasPermissionToDelete) {
      return { message: "No tienes permiso para eliminar permisos", status: 500 };
    }

    // Verificar que el permiso a eliminar exista
    const permission = await db.permission.findUnique({
      where: { id: permissionId },
    });

    if (!permission) {
      return { message: "El permiso especificado no existe", status: 404 };
    }

    // Eliminar el permiso
    await db.permission.delete({
      where: { id: permissionId },
    });

    return { message: "El permiso ha sido eliminado con éxito", status: 200 };
  } catch (error) {
    return { message: "Error al eliminar el permiso: " + error, status: 500 };
  }
}


