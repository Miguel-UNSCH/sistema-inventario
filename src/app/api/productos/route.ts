import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const nameProductoFound = await db.producto.findFirst({
            where: {
                productName: data.productName,
            },
        });

        if (nameProductoFound) {
            return NextResponse.json(
                {
                    message: "El nombre de producto ya existe",
                    status: 400,
                },
                {
                    status: 400,
                }
            );
        }

        await db.producto.create({
            data: {
                productName: data.productName,
                code: data.code,
                description: data.description,
                price: data.price,
                stock: data.stock,
                category: data.category,
                supplier: data.supplier,
                userId: data.userId, // Asegúrate de que 'userId' esté en tu payload
            },
        });

        return NextResponse.json(
            { message: "El producto se ha creado con éxito", status: 200 },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Ocurrió un error al guardar el producto: " + error, status: 500 },
            {
                status: 500,
            }
        );
    }
}

export async function GET() {
    try {
        const data = await db.producto.findMany();

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { message: "Ocurrió un error al obtener los productos: " + error, status: 500 },
            {
                status: 500,
            }
        );
    }
}
