"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CustomPieChart } from "./pie-chart";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface DataItem {
    fecha: string;
    cantidadVentas: number;
    categoria: string;
    ventaTotal: number;
}

interface CartaContainerProps {
    data: DataItem[];
}

export function CarouselD({ data }: CartaContainerProps) {
    // Sort data by date in descending order
    data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

    return (
        <div className="flex justify-center">
            {data.length === 0 ? (
                <div className="text-center text-gray-500 p-4">Sin datos</div> // Display "No Data" message
            ) : (
                <Carousel className="w-full max-w-xs mx-4 sm:max-w-md md:max-w-lg lg:max-w-xl">
                    <CarouselContent>
                        {data.map((item, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <CustomPieChart chartData={[item]} /> {/* Enviar solo el item actual como un array */}
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            )}
        </div>
    );
}
