import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

interface Params {
  id: string; 
}

export async function PUT(req: NextRequest, { params } : { params : Params}) {
  try {

    const data = await req.json();

    const roleFound = await db.role.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!roleFound) {
      return NextResponse.json(
        { message: "El rol no existe", status: 400 },
        {
          status: 400,
        }
      );
    }

    await db.role.update({
      where: {
        id: roleFound.id,
      },
      data: {
        name: data.role,
        description: data.description,
      }
    })

    return NextResponse.json(
      { message: "Se actualizó con éxito", status: 200 },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocurrió un error al eliminar el rol: " + error, status: 500 },
      {
        status: 500,
      }
    );
  }
} 

export async function DELETE(req: NextRequest, { params } : { params : Params}) { 
  try {
    await db.role.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json(
      { message: "Se eliminó con éxito", status: 200 },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocurrió un error al eliminar el rol: " + error, status: 500 },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: NextRequest, { params } : { params : Params}) {
  try {
    const data = await db.role.findUnique({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json(
      data
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocurrió un error al obtener el rol: " + error, status: 500 },
      {
        status: 500,
      }
    );
  }
}