import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

interface Params {
  id: string; 
}

export async function PUT(req: NextRequest, { params } : { params : Params}) {
  try {

    const data = await req.json();

    const permissionFound = await db.permission.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!permissionFound) {
      return NextResponse.json(
        { message: "El permiso no existe", status: 400 },
        {
          status: 400,
        }
      );
    }

    await db.permission.update({
      where: {
        id: permissionFound.id,
      },
      data: {
        roleId: data.roleId,
        module: data.module,
        action: data.action
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
    await db.permission.delete({
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
      { message: "Ocurrió un error al eliminar el permiso: " + error, status: 500 },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: NextRequest, { params } : { params : Params}) {
  try {
    const data = await db.permission.findUnique({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json(
      data
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocurrió un error al obtener el permiso: " + error, status: 500 },
      {
        status: 500,
      }
    );
  }
}