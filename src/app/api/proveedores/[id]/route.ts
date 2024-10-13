import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

interface Params {
    id: string;
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
    try {

        const data = await req.json();

        const proveedorFound = await db.proveedor.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!proveedorFound) {
            return NextResponse.json(
                { message: "La proveedor no existe", status: 400 },
                {
                    status: 400,
                }
            );
        }

        await db.proveedor.update({
            where: {
                id: proveedorFound.id,
            },
            data: {
                supplierName: data.supplierName,
                ruc: data.ruc,
                email: data.email,
                phone: data.phone,
                address: data.address,
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
            { message: "Ocurrió un error al eliminar al proveedor: " + error, status: 500 },
            {
                status: 500,
            }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    try {
        await db.proveedor.delete({
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
            { message: "Ocurrió un error al eliminar al proveedor: " + error, status: 500 },
            {
                status: 500,
            }
        );
    }
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        const data = await db.proveedor.findUnique({
            where: {
                id: params.id,
            },
        })

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