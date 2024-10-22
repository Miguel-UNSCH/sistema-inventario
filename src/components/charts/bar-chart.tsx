"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = {
    label: "Electrónicos",
    products: [
        { name: "Televisor", cantidad: 50 },
        { name: "Computadora", cantidad: 30 },
        { name: "Teléfono", cantidad: 70 },
        { name: "Tablet", cantidad: 60 },
        { name: "Cámara", cantidad: 40 },
        { name: "Auriculares", cantidad: 90 },
        { name: "MP3", cantidad: 100 },
        { name: "Proyector", cantidad: 20 },
        { name: "Videojuegos", cantidad: 25 },
        { name: "Teclado", cantidad: 80 },
        { name: "Ratón", cantidad: 60 },
        { name: "Impresora", cantidad: 15 },
        { name: "Altavoces", cantidad: 45 },
        { name: "Smartwatch", cantidad: 55 },
        { name: "HDMI", cantidad: 150 },
        { name: "Cargador", cantidad: 120 },
        { name: "Cargador", cantidad: 70 },
        { name: "Teléfono", cantidad: 20 },
        { name: "Pantalla", cantidad: 30 },
        { name: "Micrófono", cantidad: 50 },
        { name: "Accesorios", cantidad: 80 },
    ],
};

const chartConfig = {
    alto: {
        label: "Alto",
        color: "var(--chart-2)",
    },
    bajo: {
        label: "Bajo",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig

export function CustomBarChart() {
    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("alto")

    const filteredData = React.useMemo(() => {
        return chartData.products.filter((item) =>
            activeChart === "alto" ? item.cantidad > 20 : item.cantidad <= 20
        )
    }, [activeChart])

    const total = React.useMemo(
        () => ({
            alto: chartData.products.filter((item) => item.cantidad > 20).length,
            bajo: chartData.products.filter((item) => item.cantidad <= 20).length,
        }),
        [chartData]
    )

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>ALMACEN</CardTitle>
                    <CardDescription>{`Total de productos en la categoría: ${chartData.label}`}</CardDescription>
                </div>
                <div className="flex">
                    {["alto", "bajo"].map((key) => {
                        const chart = key as keyof typeof total
                        return (
                            <div
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chart === "alto" ? "Abundante" : "Escasos"}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {total[chart].toLocaleString()}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </CardHeader>

            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        data={filteredData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            label={{
                                value: 'Cantidad',
                                angle: -90,
                                position: 'insideLeft',
                                offset: 20,
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="cantidad"
                                    labelFormatter={(value) => value}
                                />
                            }
                        />
                        <Bar dataKey="cantidad" fill={chartConfig[activeChart].color} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
