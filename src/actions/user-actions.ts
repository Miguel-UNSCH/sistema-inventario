/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { updateUserSchema } from "@/utils/zod/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";

// Función para actualizar la contraseña del usuario
export async function updateUser(data: z.infer<typeof updateUserSchema>) {
  try {

    const session = await auth();

    if (!session) {
      return { message: "No existe sesión activa", status: 400 };
    }

    // Verificar que el usuario autenticado está actualizando sus propios datos
    if (data.id !== session.user.id) {
      return { message: "No tienes permiso para actualizar este usuario", status: 400 };
    }

    // Comprobar si las nuevas contraseñas coinciden
    if (data.newPassword !== data.confirmNewPassword) {
      return { message: "Las contraseñas no coinciden", status: 400, field: 2 };
    }

    // Obtener la información del usuario actual para verificar la contraseña
    const user = await db.user.findUnique({
      where: { id: data.id },
    });

    if (!user || !user.password) {
      return { message: "Usuario no encontrado o sin contraseña establecida", status: 400 };
    }

    // Verificar si la contraseña actual es correcta
    const isCurrentPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isCurrentPasswordValid) {
      return { message: "Contraseña incorrecta", status: 400, field: 1 };
    }

    // Encriptar la nueva contraseña antes de guardarla
    const hashedNewPassword = await bcrypt.hash(data.newPassword, 12);

    // Actualizar solo la contraseña en la base de datos
    await db.user.update({
      where: { id: data.id },
      data: { password: hashedNewPassword },
    });

    return { message: "Datos actualizados con éxito", status: 200 };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { message: error.errors.map(e => e.message).join(", "), status: 400 };
    }
    return { message: "Error al actualizar el usuario: " + error, status: 500 };
  }
}
