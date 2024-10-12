import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db"

export async function GET() {
    return NextResponse.json({ message: 'OK' });
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const userFound = await db.producto.findUnique({
            where: {
                code: data.code,
            },
        });

        if (userFound) {
            return NextResponse.json(
                {
                    message: "El producto ya se encutra registrado",
                },
                {
                    status: 400,
                }
            );
        }

        // Aquí se hace la carga a la base de datos

        await db.producto.create({
            data: {
                ProductName: data.productName,
                code: data.code,
                description: data.description,
                price: data.price,
                stock: data.stock,
                category: data.category,
                createdById: 1,
            },
        });

        return NextResponse.json({ message: 'Producto creado con éxito' }, {status: 200});
    } catch (error) {
        return NextResponse.json({ message: error }, {status: 500} )
    }
}