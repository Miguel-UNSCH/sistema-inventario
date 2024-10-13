import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

interface Params {
  id: string; 
}

export async function PUT(req: NextRequest, { params } : { params : Params}) {
  try {

    const data = await req.json();

    const userFound = await db.user.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!userFound) {
      return NextResponse.json(
        { message: "El usuario no existe", status: 400 },
        {
          status: 400,
        }
      );
    }
    await db.user.update({
      where: {
        id: userFound.id,
      },
      data: {
        name: data.name,
        email: data.email,
        user: data.user,
        roleId: data.roleId,
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
      { message: "Ocurrió un error al eliminar el permiso: " + error, status: 500 },
      {
        status: 500,
      }
    );
  }
} 

export async function DELETE(req: NextRequest, { params } : { params : Params}) { 
  try {
    await db.user.delete({
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
      { message: "Ocurrió un error al eliminar el usuario: " + error, status: 500 },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: NextRequest, { params } : { params : Params}) {
  try {
    const data = await db.user.findUnique({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json(
      data
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocurrió un error al obtener el usuario: " + error, status: 500 },
      {
        status: 500,
      }
    );
  }
}