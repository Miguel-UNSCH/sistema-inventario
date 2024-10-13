import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { formatDateTime } from "@/lib/format-date";

import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const userFound = await db.user.findFirst({
      where: {
        user: data.user,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "El nombre de usuario ya existe",
          status: 400,
          type: "user",
        },
        {
          status: 400,
        }
      );
    }

    // Busca por el correo electrónico
    const userEmailFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userEmailFound) {
      return NextResponse.json(
        {
          message: "El email ya se encuentra registrado",
          status: 400,
          type: "email",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        user: data.user,
        roleId: data.roleId,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "El usuario fue creado con éxito", status: 200 },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocurrió un error al guardar el usuario: " + error, status: 500 },
      {
        status: 500,
      }
    );
  }
}


export async function GET() {
  try {
    const users = await db.user.findMany({
      include: {
        role: {
          select: {
            name: true,  // Solo seleccionamos el nombre del rol
          },
        },
      },
    });

    // Formatear los datos antes de devolver la respuesta
    const formattedData = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      user: user.user,
      roleId: user.roleId,  // Obtener el ID del rol
      role: user.role ? user.role.name : null,  // Obtener el nombre del rol como cadena
      createdAt: formatDateTime(user.createdAt),  // Formatear la fecha de creación
      updatedAt: formatDateTime(user.updatedAt),  // Formatear la fecha de actualización
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    return NextResponse.json(
      { message: "Ocurrió un error al obtener los usuarios: " + error, status: 500 },
      {
        status: 500,
      }
    );
  }
}

