"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { formatDateTime } from "@/lib/format-date";

import { entradasSchema } from "@/utils/zod/schemas";
import { z } from "zod";

// ==================== CRUD PRODUCTOS ==========================

export async function getEntradas() {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "entradas" && perm.action === "leer");

    console.log(hasPermissionToCreate);

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para ver las entradas", status: 500 };
    }

    const entradas = await db.entrada.findMany({
      include: {
        producto: {
          select: {
            id: true,
            productName: true,
            code: true,
            categoryId: true,
            category: {
              select: {
                category: true,
              },
            },
          },
        },
        unidad: {
          select: {
            id: true,
            nombre: true,
            simbolo: true,
          },
        },
        proveedor: {
          select: {
            id: true,
            supplierName: true,
          },
        },
      },
    });

    // Formatear los datos antes de devolver la respuesta
    const formattedData = entradas.map((entrada) => ({
      id: entrada.id,
      productId: entrada.producto.id,
      productName: entrada.producto.productName,
      code: entrada.producto.code,
      cantidad: entrada.cantidad,
      unidadId: entrada.unidad.id,
      unidad: `${entrada.unidad.nombre} (${entrada.unidad.simbolo})`,
      category: entrada.producto.category.category,
      proveedorId: entrada.proveedor?.id,
      supplier: entrada.proveedor?.supplierName,
      precioCompra: entrada.precioCompra,
      precioVenta: entrada.precioVenta,
      createdAt: formatDateTime(entrada.createdAt),
      updatedAt: formatDateTime(entrada.updatedAt),
    }));

    return formattedData;
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function createEntrada(data: z.infer<typeof entradasSchema>) {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "entradas" && perm.action === "crear");

    console.log(hasPermissionToCreate);

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para crear entradas", status: 500 };
    }

    await db.entrada.create({
      data: {
        productId: data.productId,
        cantidad: data.cantidad,
        precioCompra: data.precioCompra,
        precioVenta: data.precioVenta,
        unidadId: data.unidadId,
        fechaEntrada: new Date(),
        proveedorId: data.proveedorId,
      },
    });

    return { message: "La entrada se ha creado con éxito", status: 200 };
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function updateEntrada(id: string, data: z.infer<typeof entradasSchema>) {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "entradas" && perm.action === "actualizar");

    console.log(hasPermissionToCreate);

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para actualizar las entradas", status: 500 };
    }

    const entradaFound = await db.entrada.findFirst({
      where: {
        id: id,
      },
    });

    if (!entradaFound) {
      return { message: "La entrada no existe", status: 400 };
    }

    await db.entrada.update({
      where: {
        id: id,
      },
      data: {
        productId: data.productId,
        cantidad: data.cantidad,
        precioCompra: data.precioCompra,
        precioVenta: data.precioVenta,
        unidadId: data.unidadId,
        fechaEntrada: new Date(),
        proveedorId: data.proveedorId,
      },
    });

    return { message: "El producto se ha actualizado con éxito", status: 200 };
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function deleteEntrada(id: string) {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "entradas" && perm.action === "eliminar");

    console.log(hasPermissionToCreate);

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para eliminar las entradas", status: 500 };
    }

    await db.entrada.delete({
      where: {
        id: id,
      },
    });

    return { message: "La entrada se ha eliminado con éxito", status: 200 };
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function getEntradasWithoutPermissions() {
  try {
    const entradas = await db.entrada.findMany({
      where: {
        // Filtra solo las entradas donde la cantidad es mayor que la cantidad vendida
        cantidad: {
          gt: db.entrada.fields.cantidadVendida,
        },
      },
      select: {
        id: true,
        cantidad: true,
        cantidadVendida: true,
        enReserva: true,
        precioCompra: true,
        precioVenta: true,
        unidad: {
          select: {
            id: true,
            nombre: true,
            simbolo: true,
          },
        },
        producto: {
          select: {
            id: true,
            productName: true,
          },
        },
        proveedor: {
          select: {
            id: true,
            supplierName: true,
          },
        }
      },
    });

    // Formatea los resultados para devolver solo id y productName
    const formattedData = entradas.map((entrada) => {
      const stockDisponible = entrada.cantidad - entrada.cantidadVendida - entrada.enReserva;
      return {
        id: entrada.id,
        productName: `${entrada.producto.productName}, ${entrada.proveedor?.supplierName}, ${stockDisponible} (${entrada.unidad.nombre})`,
      }
    });

    return formattedData;
  } catch (error) {
    return { message: "Error al obtener las entradas: " + error, status: 500 };
  }
}

