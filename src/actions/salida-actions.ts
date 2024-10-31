"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { formatDateTime } from "@/lib/format-date";

import { salidasSchema } from "@/utils/zod/schemas";
import { z } from "zod";

// ==================== CRUD PRODUCTOS ==========================

export async function getSalidasWithoutpermissions() {
  try {
    const salidas = await db.salida.findMany({
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
      },
    });

    // Agrupar productos por cantidad de ventas y ordenar en orden descendente
    const productSales = salidas.reduce((acc, salida) => {
      const productName = salida.producto.productName;
      acc[productName] = (acc[productName] || 0) + salida.cantidad;
      return acc;
    }, {} as Record<string, number>);

    // Obtener los 6 productos más vendidos
    const topProducts = Object.entries(productSales)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([productName, cantidad]) => ({ productName, cantidad }));

    return topProducts;
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}


export async function getSalidas(idClient: string) {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "salidas" && perm.action === "leer");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para ver las salidas", status: 500 };
    }

    const salidas = await db.salida.findMany({
      where: {
        clienteId: idClient,
        estado: 'reserva'
      },
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
      },
    });

    console.log(salidas);

    // Formatear los datos antes de devolver la respuesta
    const formattedData = salidas.map((salida) => ({
      id: salida.id,
      clientId: salida.clienteId,
      productId: salida.producto.id,
      entradaId: salida.entradaId,
      productName: salida.producto.productName,
      code: salida.producto.code,
      cantidad: salida.cantidad,
      unidad: `${salida.unidad.nombre} (${salida.unidad.simbolo})`,
      precioVenta: salida.precioVentaTotal,
      tipoDescuento: salida.tipoDescuento,
      descuento: salida.descuento,
      createdAt: formatDateTime(salida.createdAt),
      updatedAt: formatDateTime(salida.updatedAt),
    }));

    return formattedData;
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}

export async function createSalida(data: z.infer<typeof salidasSchema>) {
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

    const hasPermissionToCreate = permissions.some(
      (perm) => perm.module === "salidas" && perm.action === "crear"
    );

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para crear salidas", status: 500 };
    }

    console.log(data);

    const entradaProducto = await db.entrada.findUnique({
      where: { id: data.entradaId },
      select: {
        id: true,
        cantidad: true,
        cantidadVendida: true,
        enReserva: true,
        unidadId: true,
        productId: true,
      },
    });

    if (!entradaProducto) {
      return { message: "Producto no encontrado.", status: 404 };
    }

    // Calcular stock disponible considerando cantidadVendida y enReserva
    const stockDisponible =
      entradaProducto.cantidad - entradaProducto.cantidadVendida - entradaProducto.enReserva;

    if (stockDisponible < data.cantidad) {
      return {
        message: `No hay suficiente stock. Stock disponible: ${stockDisponible}`,
        status: 400,
      };
    }

    let precioVentaTotal = data.precioVenta * data.cantidad - (data.descuento || 0);
    let descuento = data.descuento;

    if (data.tipoDescuento && data.descuento) {
      if (data.tipoDescuento === "porcentual") {
        precioVentaTotal = data.precioVenta * data.cantidad - (data.precioVenta * data.descuento) / 100;
        descuento = (data.precioVenta * data.descuento) / 100;
      } else if (data.tipoDescuento === "fijo") {
        precioVentaTotal = data.precioVenta * data.cantidad - data.descuento;
        descuento = data.descuento;
      }
    }

    await db.$transaction(async (prisma) => {
      // Buscar un SalidaDetalle existente con estado 'reserva' para el cliente
      let salidaDetalle = await prisma.salidaDetalle.findFirst({
        where: {
          clientId: data.clientId,
          estado: "reserva", // Solo considerar salidaDetalle con estado 'reserva'
        },
      });

      if (!salidaDetalle) {
        // Crear un nuevo SalidaDetalle si no existe uno con estado 'reserva'
        salidaDetalle = await prisma.salidaDetalle.create({
          data: {
            estado: "reserva",
            clientId: data.clientId,
            precioVentaTotal: precioVentaTotal,
          },
        });
      } else {
        // Actualizar el precioVentaTotal existente
        salidaDetalle = await prisma.salidaDetalle.update({
          where: { id: salidaDetalle.id },
          data: {
            precioVentaTotal: {
              increment: precioVentaTotal,
            },
          },
        });
      }

      // Crear la Salida
      await prisma.salida.create({
        data: {
          estado: "reserva",
          productId: entradaProducto.productId,
          clienteId: data.clientId,
          entradaId: data.entradaId,
          cantidad: data.cantidad,
          precioVenta: data.precioVenta,
          descuento: descuento,
          tipoDescuento: data.tipoDescuento,
          precioVentaTotal: precioVentaTotal,
          unidadId: entradaProducto.unidadId,
          salidaDetalleId: salidaDetalle.id,
        },
      });

      // Actualizar el registro en Entrada
      await prisma.entrada.update({
        where: { id: data.entradaId },
        data: {
          enReserva: {
            increment: data.cantidad,
          },
        },
      });
    });

    return { message: "Agregado con éxito", status: 200 };
  } catch (error) {
    console.error("Error en createSalida:", error);
    return { message: "Error: " + error, status: 500 };
  }
}

export async function updateSalida(id: string, data: z.infer<typeof salidasSchema>) {
  try {
    const session = await auth();

    if (!session) {
      return { message: "No existe sesión activa", status: 500 };
    }

    const userWithRole = await db.user.findUnique({
      where: { id: session.user.id },
      include: { role: true },
    });

    if (!userWithRole || !userWithRole.roleId) {
      return { message: "El usuario no tiene un rol asignado", status: 400 };
    }

    const permissions = await db.permission.findMany({
      where: { roleId: userWithRole.roleId },
      select: { module: true, action: true },
    });

    const hasPermissionToUpdate = permissions.some(
      (perm) => perm.module === "salidas" && perm.action === "actualizar"
    );

    if (!hasPermissionToUpdate) {
      return { message: "No tienes permiso para actualizar salidas", status: 500 };
    }

    const entradaProducto = await db.entrada.findUnique({
      where: { id: data.entradaId },
      select: {
        id: true,
        cantidad: true,
        cantidadVendida: true,
        enReserva: true,
        unidadId: true,
        productId: true,
      },
    });

    if (!entradaProducto) {
      return { message: "Producto no encontrado", status: 404 };
    }

    const stockDisponible = entradaProducto.cantidad - entradaProducto.cantidadVendida - entradaProducto.enReserva;

    if (stockDisponible < data.cantidad) {
      return { message: `No hay suficiente stock. Stock disponible: ${stockDisponible}`, status: 400 };
    }

    const precioVentaTotal = data.precioVenta * data.cantidad - (data.descuento || 0);

    await db.salida.update({
      where: { id },
      data: {
        clienteId: data.clientId,
        entradaId: data.entradaId,
        cantidad: data.cantidad,
        precioVenta: data.precioVenta,
        descuento: data.descuento,
        tipoDescuento: data.tipoDescuento,
        precioVentaTotal,
      },
    });

    return { message: "Salida actualizada con éxito", status: 200 };
  } catch (error) {
    return { message: "Error al actualizar salida: " + error, status: 500 };
  }
}

export async function deleteSalida(id: string) {
  try {
    // 1. Autenticación
    const session = await auth();

    if (!session) {
      return { message: "No existe sesión activa", status: 401 };
    }

    // 2. Verificar el rol del usuario
    const userWithRole = await db.user.findUnique({
      where: { id: session.user.id },
      include: { role: true },
    });

    if (!userWithRole || !userWithRole.roleId) {
      return { message: "El usuario no tiene un rol asignado", status: 400 };
    }

    // 3. Verificar permisos
    const permissions = await db.permission.findMany({
      where: { roleId: userWithRole.roleId },
      select: { module: true, action: true },
    });

    const hasPermissionToDelete = permissions.some(
      (perm) => perm.module === "salidas" && perm.action === "eliminar"
    );

    if (!hasPermissionToDelete) {
      return { message: "No tienes permiso para eliminar salidas", status: 403 };
    }

    // 4. Buscar la Salida a eliminar con relaciones necesarias
    const salida = await db.salida.findUnique({
      where: { id },
      include: {
        salidaDetalle: true, // Para actualizar SalidaDetalle
        entrada: true,        // Para actualizar Entrada
      },
    });

    if (!salida) {
      return { message: "Salida no encontrada", status: 404 };
    }

    // 5. Iniciar una transacción para revertir cambios
    await db.$transaction(async (prisma) => {
      // a. Eliminar la Salida
      await prisma.salida.delete({
        where: { id },
      });

      // b. Actualizar la entrada relacionada: decrementar enReserva
      await prisma.entrada.update({
        where: { id: salida.entradaId },
        data: {
          enReserva: {
            decrement: salida.cantidad,
          },
        },
      });

      // c. Actualizar SalidaDetalle: decrementar precioVentaTotal
      await prisma.salidaDetalle.update({
        where: { id: salida.salidaDetalleId },
        data: {
          precioVentaTotal: {
            decrement: salida.precioVentaTotal,
          },
        },
      });

      // d. Verificar si el SalidaDetalle tiene más salidas asociadas
      const salidasRestantes = await prisma.salida.count({
        where: { salidaDetalleId: salida.salidaDetalleId },
      });

      if (salidasRestantes === 0) {
        // Si no hay más salidas, eliminar o actualizar el SalidaDetalle
        await prisma.salidaDetalle.delete({
          where: { id: salida.salidaDetalleId },
        });
      }
    });

    return { message: "Salida eliminada con éxito y cambios revertidos", status: 200 };
  } catch (error) {
    console.error("Error al eliminar salida:", error);
    return { message: "Error al eliminar salida: " + error, status: 500 };
  }
}

export async function getPrecioVenta(idProducto: string) {
  try {
    const entrada = await db.entrada.findUnique({
      where: {
        id: idProducto,
      },
    });

    if (!entrada) {
      return { message: "No se encontró ninguna entrada para el producto especificado", status: 404 };
    }

    return { precioVenta: entrada.precioVenta };
  } catch (error) {
    console.error("Error al obtener el precio de venta:", error);
    return { message: "Error al obtener el precio de venta: " + error, status: 500 };
  }
}

export async function confirmVenta(salidaDetalleId: string) {
  try {
    // Autenticación
    const session = await auth();

    if (!session) {
      return { message: "No existe sesión activa", status: 401 };
    }

    // Verificar el rol del usuario
    const userWithRole = await db.user.findUnique({
      where: { id: session.user.id },
      include: { role: true },
    });

    if (!userWithRole || !userWithRole.roleId) {
      return { message: "El usuario no tiene un rol asignado", status: 400 };
    }

    // Verificar permisos
    const permissions = await db.permission.findMany({
      where: { roleId: userWithRole.roleId },
      select: { module: true, action: true },
    });

    const hasPermissionToConfirm = permissions.some((perm) => perm.module === "salidas" && perm.action === "crear");

    if (!hasPermissionToConfirm) {
      return { message: "No tienes permiso para confirmar ventas", status: 400 };
    }

    console.log("Datos para confirmar venta:", salidaDetalleId);

    // Buscar el SalidaDetalle
    const salidaDetalle = await db.salidaDetalle.findUnique({
      where: { id: salidaDetalleId },
      include: { salidas: true },
    });

    if (!salidaDetalle) {
      return { message: "SalidaDetalle no encontrado.", status: 400 };
    }

    if (salidaDetalle.estado !== "reserva") {
      return { message: "La salida ya está confirmada o en otro estado.", status: 400 };
    }

    // Ejecutar las operaciones en una transacción
    const resultado = await db.$transaction(async (prisma) => {
      // Actualizar el estado de SalidaDetalle a 'vendido'
      const salidaDetalleActualizada = await prisma.salidaDetalle.update({
        where: { id: salidaDetalleId },
        data: { estado: "vendido" },
      });

      // Actualizar el estado de todas las Salidas asociadas a este SalidaDetalle a 'vendido'
      const salidasActualizadas = await prisma.salida.updateMany({
        where: { salidaDetalleId: salidaDetalleId },
        data: { estado: "vendido" },
      });

      // Actualizar la tabla Entrada: incrementar cantidadVendida y decrementar enReserva
      for (const salida of salidaDetalle.salidas) {
        await prisma.entrada.update({
          where: { id: salida.entradaId },
          data: {
            cantidadVendida: {
              increment: salida.cantidad,
            },
            enReserva: {
              decrement: salida.cantidad,
            },
          },
        });
      }

      return { salidaDetalleActualizada, salidasActualizadas };
    });

    return { message: "Venta confirmada con éxito", status: 200, data: resultado };
  } catch (error) {
    console.error("Error al confirmar la venta:", error);
    if (error) {
      return { message: `Error de base de datos: ${error}`, status: 500 };
    }
    return { message: "Error inesperado: " + (error instanceof Error ? error.message : error), status: 500 };
  }
}

export async function getDetalleSalidas() {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "salidas" && perm.action === "leer");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para ver las salidas", status: 500 };
    }


    const detalleSalidas = await db.salidaDetalle.findMany({
      where: {
        estado: "vendido",
      },
      include: {
        cliente: true,
        salidas: {
          include: {
            producto: true,
            entrada: {
              include: {
                proveedor: true,
              },
            },
          },
        },
      },
    });

    const formattedData = detalleSalidas.map((detalle) => {
      // Obtener nombre y identifier basado en tipoCliente
      let clienteName: string;
      let identifier: string;

      if (detalle.cliente.tipoCliente === "natural") {
        clienteName = `${detalle.cliente.firstName} ${detalle.cliente.lastName}`;
        identifier = detalle.cliente.identifier || "N/A"; // DNI/CE
      } else if (detalle.cliente.tipoCliente === "juridico") {
        clienteName = detalle.cliente.companyName || "N/A";
        identifier = detalle.cliente.ruc || "N/A"; // RUC
      } else {
        clienteName = "Tipo de cliente desconocido";
        identifier = "N/A";
      }

      // Concatenar productos vendidos
      const productosVendidos = detalle.salidas
        .map((salida) => {
          const productName = salida.producto.productName || "Producto sin nombre";
          const proveedorName = salida.entrada.proveedor?.supplierName || "Sin proveedor";
          const cantidad = salida.cantidad;
          const precioTotal = salida.precioVentaTotal.toFixed(2); // Formatear a 2 decimales
          return `${productName} - ${proveedorName} - Cantidad: ${cantidad} - Precio Total: $${precioTotal}`;
        })
        .join("\n"); // Separar cada producto por salto de linea

      return {
        id: detalle.id,
        clienteName,
        identifier,
        productosVendidos,
        precioVentaTotal: detalle.precioVentaTotal,
        createdAt: formatDateTime(detalle.createdAt),
        updatedAt: formatDateTime(detalle.updatedAt),
      };
    });

    return formattedData;
  } catch (error) {
    console.error("Error en getDetalleSalidas:", error);
    return { message: `Error: ${error}`, status: 500 };
  }
}

export async function getIdSalidaDetalle(idClient: string) {
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

    const hasPermissionToCreate = permissions.some((perm) => perm.module === "salidas" && perm.action === "leer");

    if (!hasPermissionToCreate) {
      return { message: "No tienes permiso para ver las salidas", status: 500 };
    }

    const salidaDetalle = await db.salidaDetalle.findFirst({
      where: {
        clientId: idClient,
        estado: "reserva",
      },
      select: {
        id: true,
      }
    });

    if (!salidaDetalle) {
      return { message: "La salida no existe", status: 400 };
    }

    return salidaDetalle.id;
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}
