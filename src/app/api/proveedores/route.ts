import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const nameProveedorFound = await db.proveedor.findUnique({
            where: {
                supplierName: data.supplierName,
            },
        });

        if (nameProveedorFound) {
            return NextResponse.json(
                {
                    message: "El proveedor ya existe",
                    status: 400,
                },
                {
                    status: 400,
                }
            );
        }

        await db.proveedor.create({
            data: {
                supplierName: data.supplierName,
                ruc: data.ruc,
                email: data.email,
                phone: data.phone,
                address: data.address,
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
            { message: "Ocurrió un error al guardar al proveedor: " + error, status: 500 },
            {
                status: 500,
            }
        );
    }
}

export async function GET() {
    try {
        const data = await db.proveedor.findMany()

        return NextResponse.json(
            data
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Ocurrió un error al obtener al proveedor: " + error, status: 500 },
            {
                status: 500,
            }
        );
    }
}