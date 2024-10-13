import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { formatDateTime } from "@/lib/format-date";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const permissionFound = await db.permission.findFirst({
      where: {
        roleId: data.roleId,
        module: data.module,
        action: data.action
      },
    });

    if (permissionFound) {
      return NextResponse.json(
        {
          message: "La asignación del rol ya existe",
          status: 400,
        },
        {
          status: 400,
        }
      );
    }

    await db.permission.create({
      data: {
        roleId: data.roleId,
        module: data.module,
        action: data.action
      },
    });

    return NextResponse.json(
      { message: "El permiso para el rol se a creado con éxito", status: 200 },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocurrió un error al guardar el permiso: " + error, status: 500 },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const permissions = await db.permission.findMany({
      include: {
        role: {
          select: {
            name: true, 
          },
        },
      },
    });

    // Formatear los datos antes de devolver la respuesta
    const formattedData = permissions.map((permission) => ({
      id: permission.id,
      action: permission.action,
      module: permission.module,
      role: permission.role.name,  // Devolver el nombre del rol
      roleId: permission.roleId,
      createdAt: formatDateTime(permission.createdAt),  // Formatear la fecha de creación
      updatedAt: formatDateTime(permission.updatedAt),  // Formatear la fecha de actualización
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    return NextResponse.json(
      { message: "Ocurrió un error al obtener los permisos: " + error, status: 500 },
      {
        status: 500,
      }
    );
  }
}
