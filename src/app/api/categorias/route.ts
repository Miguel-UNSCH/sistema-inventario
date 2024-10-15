import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const nameCategoriaFound = await db.categoria.findUnique({
      where: {
        category: data.category,
      },
    });

    if (nameCategoriaFound) {
      return NextResponse.json(
        {
          message: "La categoria ya existe",
          status: 400,
        },
        {
          status: 400,
        }
      );
    }

    await db.categoria.create({
      data: {
        category: data.category,
        description: data.description,// Asegúrate de obtener y pasar este valor correctamente
      },
    });

    return NextResponse.json(
      { message: "La categoria se a creado con éxito", status: 200 },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocurrió un error al guardar la categoria: " + error, status: 500 },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const data = await db.categoria.findMany()

    return NextResponse.json(
      data
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocurrió un error al obtener los categoria: " + error, status: 500 },
      {
        status: 500,
      }
    );
  }
}