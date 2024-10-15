import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

interface Params {
    id: string;
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
    try {

        const data = await req.json();

        const productoFound = await db.producto.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!productoFound) {
            return NextResponse.json(
                { message: "El producto no existe", status: 400 },
                {
                    status: 400,
                }
            );
        }

        await db.producto.update({
            where: {
                id: productoFound.id,
            },
            data: {
                productName: data.productName,
                code: data.code,
                description: data.description,
                price: data.price,
                stock: data.stock,
                category: data.category,
                supplier: data.supplier,
            },
        })

        return NextResponse.json(
            { message: "Se actualizó con éxito", status: 200 },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Ocurrió un error al eliminar el producto: " + error, status: 500 },
            {
                status: 500,
            }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    try {
        await db.producto.delete({
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
            { message: "Ocurrió un error al eliminar el producto: " + error, status: 500 },
            {
                status: 500,
            }
        );
    }
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        const data = await db.producto.findUnique({
            where: {
                id: params.id,
            },
        })

        return NextResponse.json(
            data
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Ocurrió un error al obtener el producto: " + error, status: 500 },
            {
                status: 500,
            }
        );
    }
}