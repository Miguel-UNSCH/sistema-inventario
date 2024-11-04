"use client";

import { useState, useEffect } from "react";
import { CarouselD } from "@/components/charts/carousel-chat";
import { Combobox } from "@/components/select/combobox";
import { CustomAreaChart } from "@/components/charts/area-chart";

interface ReporteContainerProps {
    dataCategy: Record<string, any>[];
    dataProduct: Record<string, any>[];
    dataSalidas: { productId: string; cantidad: number; updatedAt: { day: number; month: number; year: number }; totalRevenue: number }[];
}

function ReportesConteiner({ dataCategy, dataProduct, dataSalidas }: ReporteContainerProps) {
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [selectedSalida, setSelectedSalida] = useState<{ productId: string; cantidad: number; updatedAt: { day: number; month: number; year: number }; totalRevenue: number }[]>([]);
    const [chartData, setChartData] = useState<{ day: string; ventas: number }[]>([]);

    const productOptions = dataProduct.map(product => ({
        value: product.id,
        label: product.productName
    }));

    const selectedProduct = dataProduct.find(product => product.id === selectedProductId);

    const handleProductSelect = (value: string | null) => {
        setSelectedProductId(value);
        if (value) {
            const selectedSalidasFiltro = dataSalidas.filter(salida => salida.productId === value);
            setSelectedSalida(selectedSalidasFiltro);
        }
    };

    useEffect(() => {
        if (selectedSalida.length > 0) {
            const today = new Date();
            const ventasDataArray = Array.from({ length: 7 }, (_, index) => {
                const date = new Date(today);
                date.setDate(today.getDate() - index);
                const dateKey = date.toLocaleDateString("es-ES", { day: "numeric", month: "numeric", year: "numeric" });

                const totalVentas = selectedSalida.reduce((acc, salida) => {
                    const updatedAt = new Date(`${salida.updatedAt.year}-${salida.updatedAt.month}-${salida.updatedAt.day}`);
                    const salidaDateKey = updatedAt.toLocaleDateString("es-ES", { day: "numeric", month: "numeric", year: "numeric" });

                    return salidaDateKey === dateKey ? acc + salida.cantidad : acc;
                }, 0);

                return { day: dateKey, ventas: totalVentas };
            }).reverse();

            setChartData(ventasDataArray);
        } else {
            setChartData(Array.from({ length: 7 }, (_, index) => {
                const date = new Date();
                date.setDate(date.getDate() - index);
                const dateKey = date.toLocaleDateString("es-ES", { day: "numeric", month: "numeric", year: "numeric" });
                return { day: dateKey, ventas: 0 };
            }).reverse());
        }
    }, [selectedSalida]);

    // Create formatted data for CarouselD
    const formattedData = selectedSalida.map(salida => {
        const category = dataCategy.find(cat => cat.id === selectedProduct?.categoryId);
        return {
            fecha: `${salida.updatedAt.year}-${salida.updatedAt.month}-${salida.updatedAt.day}`,
            cantidadVentas: salida.cantidad,
            categoria: category ? category.category : "N/A",
            ventaTotal: salida.totalRevenue,
        };
    });

    return (
        <div className="space-y-6 max-w-full p-4">
            <div className="flex flex-col gap-4 lg:gap-[50px] mt-4">
                <div className="w-full lg:w-1/2 flex flex-col mb-12 lg:mb-0">
                    <div className="w-[300px] mb-4">
                        <Combobox
                            options={productOptions}
                            placeholder="Selecciona el producto"
                            onChange={handleProductSelect}
                            value={selectedProductId || undefined}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 md:pr-4">
                    <CustomAreaChart
                        productName={selectedProduct?.productName || "Nombre"}
                        productDescription={`${selectedProduct?.description || "Descripción"}`}
                        ventasData={chartData}
                    />
                    <CarouselD data={formattedData} />
                </div>
            </div>
        </div>
    );
}

export default ReportesConteiner;
