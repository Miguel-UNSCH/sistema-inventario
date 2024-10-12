import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db"

export async function GET() {
  return NextResponse.json({ message: 'OK' });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const userFound = await db.personaNatural.findUnique({
      where: {
        identifier: data.identifier,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "El DNI ya se encuentra registrado",
        },
        {
          status: 400,
        }
      );
    }

    // Aquí se hace la carga a la base de datos

    await db.personaNatural.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        identifier: data.identifier,
        email: data.email,
        phone: data.phone,
        address: data.address,
        createdById: 1,
      },
    });

    return NextResponse.json({ message: 'Cliente creado con éxito', status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error })
  }
}