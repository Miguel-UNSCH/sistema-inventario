import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

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
    const data = await db.role.findMany()

    return NextResponse.json(
      data
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocurrió un error al obtener los roles: " + error, status: 500 },
      {
        status: 500,
      }
    );
  }
}