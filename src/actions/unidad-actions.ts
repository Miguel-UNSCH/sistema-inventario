"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { formatDateTime } from "@/lib/format-date";

// ==================== CRUD PRODUCTOS ==========================

export async function getUnidades() {
  try {
    const session = await auth();

    if (!session) {
      return { message: "No existe sessión activa", status: 500 };
    }

    const unidades = await db.unidadMedida.findMany();
    
    // Formatear los datos antes de devolver la respuesta
    const formattedData = unidades.map((unidad) => ({
        id: unidad.id,
        nombre: unidad.nombre,
        simbolo: unidad.simbolo,
        createdAt: formatDateTime(unidad.createdAt),
        updatedAt: formatDateTime(unidad.updatedAt),
      }));

    return formattedData;
  } catch (error) {
    return { message: "error" + error, status: 500 };
  }
}