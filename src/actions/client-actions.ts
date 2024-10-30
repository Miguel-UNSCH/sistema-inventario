"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { formatDateTime } from "@/lib/format-date";

import { personaNaturalSchema, personaJuridicaSchema } from "@/utils/zod/schemas";
import { z } from "zod";

// ==================== CRUD CLIENTES ==========================

export async function getAllClients() {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "clientes" && perm.action === "leer");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para ver los clientes", status: 500 };
    }

    const clientes = await db.cliente.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Formatear los datos antes de devolver la respuesta
    const formattedData = clientes.map((cliente) => ({
      id: cliente.id,
      tipoCliente: cliente.tipoCliente,
      firstName: cliente.firstName,
      lastName: cliente.lastName,
      identifier: cliente.identifier,
      companyName: cliente.companyName,
      ruc: cliente.ruc,
      representativeName: cliente.representativeName,
      representativePosition: cliente.representativePosition,
      companyType: cliente.companyType,
      email: cliente.email,
      phone: cliente.phone,
      address: cliente.address,
      createdById: cliente.createdById,
      createdByName: cliente.createdBy?.name,
      createdAt: formatDateTime(cliente.createdAt),
      updatedAt: formatDateTime(cliente.updatedAt),
    }));

    return formattedData;
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function getClientsNatural() {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "clientes" && perm.action === "leer");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para ver los clientes", status: 500 };
    }

    const clientes = await db.cliente.findMany({
      where: {
        tipoCliente: 'natural'
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Formatear los datos antes de devolver la respuesta
    const formattedData = clientes.map((cliente) => ({
      id: cliente.id,
      tipoCliente: cliente.tipoCliente,
      firstName: cliente.firstName,
      lastName: cliente.lastName,
      identifier: cliente.identifier,
      email: cliente.email,
      phone: cliente.phone,
      address: cliente.address,
      createdById: cliente.createdById,
      createdByName: cliente.createdBy?.name,
      createdAt: formatDateTime(cliente.createdAt),
      updatedAt: formatDateTime(cliente.updatedAt),
    }));

    return formattedData;
  } catch (error) {
    return { message: "error: " + error, status: 500 };
  }
}

export async function getClientsJuridico() {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "clientes" && perm.action === "leer");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para ver los clientes", status: 500 };
    }

    const clientes = await db.cliente.findMany({
      where: {
        tipoCliente: 'juridico'
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Formatear los datos antes de devolver la respuesta
    const formattedData = clientes.map((cliente) => ({
      id: cliente.id,
      tipoCliente: cliente.tipoCliente,
      companyName: cliente.companyName,
      ruc: cliente.ruc,
      representativeName: cliente.representativeName,
      representativePosition: cliente.representativePosition,
      companyType: cliente.companyType,
      email: cliente.email,
      phone: cliente.phone,
      address: cliente.address,
      createdById: cliente.createdById,
      createdByName: cliente.createdBy?.name,
      createdAt: formatDateTime(cliente.createdAt),
      updatedAt: formatDateTime(cliente.updatedAt),
    }));

    return formattedData;
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function getAllClientsWithoutPermissions() {
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

    const clientes = await db.cliente.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Formatear los datos antes de devolver la respuesta
    const formattedData = clientes.map((cliente) => ({
      id: cliente.id,
      tipoCliente: cliente.tipoCliente,
      firstName: cliente.firstName,
      lastName: cliente.lastName,
      identifier: cliente.identifier,
      companyName: cliente.companyName,
      ruc: cliente.ruc,
      representativeName: cliente.representativeName,
      representativePosition: cliente.representativePosition,
      companyType: cliente.companyType,
      email: cliente.email,
      phone: cliente.phone,
      address: cliente.address,
      createdById: cliente.createdById,
      createdByName: cliente.createdBy?.name,
      createdAt: formatDateTime(cliente.createdAt),
      updatedAt: formatDateTime(cliente.updatedAt),
    }));

    return formattedData;
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function createClientNatural(data: z.infer<typeof personaNaturalSchema>) {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "clientes" && perm.action === "crear");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para agregar clientes", status: 500 };
    }

    const clientFound = await db.cliente.findUnique({
      where: {
        identifier: data.identifier,
      },
    })

    if (clientFound) {
      return { message: "Ya existe un cliente con el mismo número de identificación", status: 400 };
    }

    await db.cliente.create({
      data: {
        tipoCliente: "natural",
        firstName: data.firstName,
        lastName: data.lastName,
        identifier: data.identifier,
        email: data.email,
        phone: data.phone,
        address: data.address,
        createdById: userWithRole.id,
      },
    });

    return { message: "Datos guardados con éxito", status: 200 };
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function updateClientNatural(id: string, data: z.infer<typeof personaNaturalSchema>) {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "clientes" && perm.action === "actualizar");


    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para actualizar los clientes", status: 500 };
    }

    const clientFound = await db.cliente.findFirst({
      where: {
        id: id,
      },
    });

    if (!clientFound) {
      return { message: "El cliente no existe", status: 400 };
    }

    await db.cliente.update({
      where: {
        id: id,
      },
      data: {
        tipoCliente: "natural",
        firstName: data.firstName,
        lastName: data.lastName,
        identifier: data.identifier,
        email: data.email,
        phone: data.phone,
        address: data.address,
        createdById: userWithRole.id,
      },
    });

    return { message: "Los datos se actualizaron con éxito", status: 200 };
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function createClientJuridico(data: z.infer<typeof personaJuridicaSchema>) {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "clientes" && perm.action === "crear");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para agregar clientes", status: 500 };
    }

    const clientFound = await db.cliente.findUnique({
      where: {
        ruc: data.ruc
      }
    })

    if (clientFound) {
      return { message: "Ya existe un cliente con el mismo RUC", status: 400 };
    }

    await db.cliente.create({
      data: {
        tipoCliente: "juridico",
        companyName: data.companyName,
        ruc: data.ruc,
        representativeName: data.representativeName,
        representativePosition: data.representativePosition,
        companyType: data.companyType,
        email: data.email,
        phone: data.phone,
        address: data.address,
        createdById: userWithRole.id,
      },
    });

    return { message: "Datos guardados con éxito", status: 200 };
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function updateClientJuridico(id: string, data: z.infer<typeof personaJuridicaSchema>) {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "clientes" && perm.action === "actualizar");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para actualizar las entradas", status: 500 };
    }

    const clientFound = await db.cliente.findFirst({
      where: {
        id: id,
      },
    });

    if (!clientFound) {
      return { message: "El cliente no existe", status: 400 };
    }

    await db.cliente.update({
      where: {
        id: id,
      },
      data: {
        tipoCliente: "juridico",
        companyName: data.companyName,
        ruc: data.ruc,
        representativeName: data.representativeName,
        representativePosition: data.representativePosition,
        companyType: data.companyType,
        email: data.email,
        phone: data.phone,
        address: data.address,
        createdById: userWithRole.id,
      },
    });

    return { message: "El producto se ha actualizado con éxito", status: 200 };
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function deleteClient(id: string) {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "clientes" && perm.action === "eliminar");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para eliminar los clientes", status: 500 };
    }

    await db.cliente.delete({
      where: {
        id: id,
      },
    });

    return { message: "El cliente fue eliminado con éxito", status: 200 };
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}
