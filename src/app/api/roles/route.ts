import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { formatDateTime } from "@/lib/format-date";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const nameRoleFound = await db.role.findUnique({
      where: {
        name: data.role,
      },
    });

    if (nameRoleFound) {
      return NextResponse.json(
        {
          message: "El nombre de rol ya existe",
          status: 400,
        },
        {
          status: 400,
        }
      );
    }

    await db.role.create({
      data: {
        name: data.role,
        description: data.description,
      },
    });

    return NextResponse.json(
      { message: "El rol se a creado con éxito", status: 200 },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocurrió un error al guardar el role: " + error, status: 500 },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
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
    return NextResponse.json(formattedData);
  } catch (error) {
    return NextResponse.json(
      { message: "Ocurrió un error al obtener los roles: " + error, status: 500 },
      {
        status: 500,
      }
    );
  }
}