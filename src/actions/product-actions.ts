"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { formatDateTime } from "@/lib/format-date";

import { productSchema } from "@/utils/zod/schemas";
import { z } from "zod";

// ==================== CRUD PRODUCTOS ==========================

export async function getProducts() {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "productos" && perm.action === "leer");

    console.log(hasPermissionToCreate);

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para ver los productos", status: 500 };
    }

    const products = await db.producto.findMany({
      include: {
        category: {
            select: {
                category: true,
            },
        },
        supplier: {
            select: {
                supplierName: true,
            }
        },
        createdBy: {
          select: {
                name: true,
            },
        }
      },
    });

    // Formatear los datos antes de devolver la respuesta
    const formattedData = products.map((product) => ({
        id: product.id,
        productName: product.productName,
        code: product.code,
        description: product.description,
        stockMinimo: product.stockMinimo,
        categoryId: product.categoryId,
        supplierId: product.supplierId,
        category: product.category.category,
        supplier: product.supplier?.supplierName,
        createdById: product.createdById,
        createdBy: product.createdBy?.name,
        createdAt: formatDateTime(product.createdAt),
        updatedAt: formatDateTime(product.updatedAt),
      }));

    return formattedData;
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function createProducto(data: z.infer<typeof productSchema>) {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "productos" && perm.action === "crear");

    console.log(hasPermissionToCreate);

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para crear productos", status: 500 };
    }

    const codeProduct = await db.producto.findUnique({
      where: {
        code: data.code,
      },
    });

    if (codeProduct) {
      return { message: "El código de producto", status: 400 };
    }

    const nameProductoFound = await db.producto.findFirst({
      where: {
        productName: data.productName,
      },
    });

    if (nameProductoFound) {
      return { message: "El nombre de producto ya existe", status: 400 };
    }

    await db.producto.create({
      data: {
        productName: data.productName,
        code: data.code,
        description: data.description,
        stockMinimo: data.stockMinimo,
        categoryId: data.categoryId,
        supplierId: data.supplierId,
        createdById: session.user.id,
      },
    });

    return { message: "El producto se ha creado con éxito", status: 200 };
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function updateProducto(id: string, data: z.infer<typeof productSchema>) {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "productos" && perm.action === "actualizar");

    console.log(hasPermissionToCreate);

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para actualizar los productos", status: 500 };
    }

    const productFound = await db.producto.findFirst({
      where: {
        id: id,
      },
    });

    if (!productFound) {
      return { message: "El producto no existe", status: 400 };
    }

    await db.producto.update({
      where: {
        id: id,
      },
      data: {
        productName: data.productName,
        code: data.code,
        stockMinimo: data.stockMinimo,
        categoryId: data.categoryId,
        supplierId: data.supplierId,
        description: data.description,
      },
    });

    return { message: "El producto se ha actualizado con éxito", status: 200 };
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function deleteProducto(id: string) {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "productos" && perm.action === "eliminar");

    console.log(hasPermissionToCreate);

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para eliminar los productos", status: 500 };
    }

    await db.producto.delete({
      where: {
        id: id,
      },
    });

    return { message: "El producto se ha eliminado con éxito", status: 200 };
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}
