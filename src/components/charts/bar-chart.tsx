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

interface CustomBarChartProps {
    data: {
        label: string;
        products: { name: string; cantidad: number; stockMinimo: number; unidad: string; }[]; // Cambié stockMinimo a number
    };
}

const chartConfig = {
    abundante: {
        label: "Abundante",
        color: "var(--chart-2)",
    },
    escaso: {
        label: "Escaso",
        color: "var(--chart-3)",
    },
    agotado: {
        label: "Agotado",
        color: "var(--chart-4)",
    },
} satisfies ChartConfig

export function CustomBarChart({ data }: CustomBarChartProps) {
    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("abundante")

    const filteredData = React.useMemo(() => {
        return data.products.filter((item) =>
            activeChart === "abundante" ? item.cantidad > item.stockMinimo :
                activeChart === "escaso" ? (item.cantidad > 0 && item.cantidad <= item.stockMinimo) :
                    item.cantidad === 0
        )
    }, [activeChart, data.products])

    const total = React.useMemo(
        () => ({
            abundante: data.products.filter((item) => item.cantidad > item.stockMinimo).length,
            escaso: data.products.filter((item) => item.cantidad > 0 && item.cantidad <= item.stockMinimo).length,
            agotado: data.products.filter((item) => item.cantidad === 0).length,
        }),
        [data.products]
    )

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>ALMACEN</CardTitle>
                    <CardDescription>{`Total de productos en la categoría: ${data.label}`}</CardDescription>
                </div>
                <div className="flex">
                    {["abundante", "escaso", "agotado"].map((key) => {
                        const chart = key as keyof typeof total
                        return (
                            <div
                                key={chart}
                                data-active={activeChart === chart}
                                className="cursor-pointer relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
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
                                    labelFormatter={(name) => name}
                                    formatter={(value, name, props) => [
                                        "Cantidad: ",
                                        `${value} ${props.payload.unidad}`,
                                    ]}
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
