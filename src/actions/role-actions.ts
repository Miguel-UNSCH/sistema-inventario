"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { z } from "zod";
import { formatDateTime } from "@/lib/format-date";
import { roleSchema } from "@/utils/zod/schemas";

export async function getRoleWhitoutPermissions() {
  try {
    const roles = await db.role.findMany();
    const formattedData = roles.map((role) => {
      return {
        id: role.id,
        name: role.name,
      };
    });
    return formattedData
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function getRoles() {
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

    const roles = await db.role.findMany({
      include: {
        users: {
          select: {
            name: true,
          },
        },
        permissions: {
          select: {
            module: true,
            action: true,
          },
        },
      },
    });
    // Formatear los datos para convertir los arrays en cadenas y organizar permisos por módulo
    const formattedData = roles.map((role) => {
      // Agrupar las acciones por módulo
      const permissionsByModule = role.permissions.reduce<Record<string, string[]>>((acc, permission) => {
        if (!acc[permission.module]) {
          acc[permission.module] = [];
        }
        acc[permission.module].push(permission.action);
        return acc;
      }, {});
      // Formatear los permisos como { modulo: [leer, escribir, eliminar] }
      const formattedPermissions = Object.entries(permissionsByModule)
        .map(([module, actions]) => `{ ${module}: [${actions.join(', ')}] }`)
        .join('\n');
      return {
        id: role.id,
        name: role.name,
        description: role.description,
        users: role.users.length > 0
          ? `[${role.users.map((user) => user.name).join(', ')}]`
          : '', // Convertir usuarios a cadena
        permissions: formattedPermissions || '', // Formatear los permisos agrupados por módulo
        createdAt: formatDateTime(role.createdAt),
        updatedAt: formatDateTime(role.updatedAt),
      };
    });
    return formattedData
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function createRole(data: z.infer<typeof roleSchema>) {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "roles" && perm.action === "crear");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para ver los roles", status: 500 };
    }

    const nameRoleFound = await db.role.findUnique({
      where: {
        name: data.role,
      },
    });

    if (nameRoleFound) {
      return {
        message: "El nombre de rol ya existe",
        status: 400,
      }
    }

    await db.role.create({
      data: {
        name: data.role,
        description: data.description,
      },
    });

    return { message: "El rol se a creado con éxito", status: 200 }
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function updateRole(roleId: string, data: z.infer<typeof roleSchema>) {
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

    // Verificar permiso de "editar" en el módulo "roles"
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
      return { message: "No tienes permiso para editar los roles", status: 500 };
    }

    // Verificar que el rol a actualizar exista
    const role = await db.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      return { message: "El rol especificado no existe", status: 404 };
    }

    // Actualizar el rol
    await db.role.update({
      where: { id: roleId },
      data: {
        name: data.role,
        description: data.description,
      },
    });

    return { message: "El rol ha sido actualizado con éxito", status: 200 };
  } catch (error) {
    return { message: "Error al actualizar el rol: " + error, status: 500 };
  }
}

export async function deleteRole(roleId: string) {
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

    // Verificar permiso de "eliminar" en el módulo "roles"
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
      return { message: "No tienes permiso para eliminar los roles", status: 500 };
    }

    // Verificar que el rol a eliminar exista
    const role = await db.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      return { message: "El rol especificado no existe", status: 404 };
    }

    // Eliminar el rol
    await db.role.delete({
      where: { id: roleId },
    });

    return { message: "El rol ha sido eliminado con éxito", status: 200 };
  } catch (error) {
    return { message: "Error al eliminar el rol: " + error, status: 500 };
  }
}
