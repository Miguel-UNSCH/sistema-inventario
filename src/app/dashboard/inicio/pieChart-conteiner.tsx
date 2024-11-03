"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

interface CustomAreaChartProps {
  salidas: Array<{ productName: string; cantidad: number }>;
}

export function CustomAreaChart({ salidas }: CustomAreaChartProps) {
  const chartConfig = {
    productName: {
      label: "Producto",
      color: "var(--chart-1)",
    },
    cantidad: {
      label: "Cantidad",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <>
      <CardHeader>
        <CardTitle>Productos - Salidas</CardTitle>
        <CardDescription>Mostrando el total de productos más vendidos esta semana</CardDescription>
      </CardHeader>
      <Card className="h-full flex flex-col">
        <CardContent className="w-full h-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              accessibilityLayer
              data={salidas}
              margin={{
                top: 20,
              }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="productName" tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="cantidad" fill="var(--color-cantidad)" radius={10}>
                <LabelList position="center" offset={12} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
