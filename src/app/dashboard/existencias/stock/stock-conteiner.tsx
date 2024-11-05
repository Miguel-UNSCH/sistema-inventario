/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Indica que este componente es un Client Component

import { useState, useEffect } from "react";
import { CustomBarChart } from "@/components/charts/bar-chart";
import { Combobox } from "@/components/select/combobox";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface StockContainerProps {
    dataProduct: Record<string, any>[];
    dataCategory: Record<string, any>[];
    dataEntradas: Record<string, any>[];
}

function StockConteiner({ dataProduct, dataCategory, dataEntradas }: StockContainerProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [chartData, setChartData] = useState<{ label: string; products: { name: string; cantidad: number; stockMinimo: number; unidad: string }[] }>({
        label: "Elige una categoría",
        products: [],
    });

    const categoryOptions = dataCategory.map(category => ({
        value: String(category.id),
        label: String(category.category)
    }));

    const handleUpdate = () => {
        // Obtén el nombre de la categoría seleccionada
        const selectedCategoryName = dataCategory.find(category => category.id === selectedCategory)?.category || "Categoría desconocida";

        const filteredEntries = dataEntradas.filter(item => {
            // Encuentra el producto correspondiente en dataProduct usando item.productId
            const productEntry = dataProduct.find(entry => entry.id === item.productId);

            // Comprueba si productEntry existe y si su categoryId coincide con selectedCategory
            return productEntry && productEntry.categoryId === selectedCategory;
        });

        const productQuantities = filteredEntries.reduce((acc, item) => {
            const productEntry = dataProduct.find(entry => entry.id === item.productId);
            if (productEntry) {
                const { productName, stockMinimo } = productEntry; // Cambiado a productName
                const { unidad } = item; // Extrae unidad desde dataEntradas

                // Usa una clave compuesta para diferenciar productos con el mismo nombre pero diferentes unidades
                const key = `${productName}-${unidad}`;

                if (!acc[key]) {
                    acc[key] = { name: productName, cantidad: 0, stockMinimo: Number(stockMinimo), unidad };
                }

                acc[key].cantidad += item.cantidad - item.cantidadVendida - item.reserva;
            }
            return acc;
        }, {});

        // Convierte el objeto a un array y ordena alfabéticamente por el nombre del producto
        const resultArray = Object.values(productQuantities).sort((a, b) => a.name.localeCompare(b.name));

        // Actualiza el estado de chartData
        setChartData({
            label: selectedCategoryName,
            products: resultArray,
        });
    };

    // Ejecuta handleUpdate cada vez que selectedCategory cambie
    useEffect(() => {
        if (selectedCategory) {
            handleUpdate();
        }
    }, [selectedCategory]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex w-full md:w-auto items-center gap-2">
                    <div className="w-[250px]">
                        <Combobox
                            options={categoryOptions}
                            placeholder="Selecciona la categoría"
                            value={selectedCategory || undefined}
                            onChange={(value) => {
                                setSelectedCategory(value);
                            }}
                        />
                    </div>
                </div>
                <Button variant="outline" className="text-white bg-primary dark:bg-primary">
                    <Link href="/dashboard/productos/categorias">Agregar una categoría</Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 rounded-lg shadow-lg gap-6">
                <CustomBarChart data={chartData} />
            </div>
        </div>
    );
}

export default StockConteiner;
