"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Productos - Salidas</CardTitle>
        <CardDescription>Mostrando el total de productos más vendidos este mes</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer config={chartConfig} className="h-full">
          <AreaChart
            className="h-full"
            data={salidas}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false}/>
            <XAxis 
              dataKey="productName" 
              tickLine={false} 
              axisLine={false} 
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="cantidad"
              type="monotone"
              fill={chartConfig.cantidad.color}
              fillOpacity={0.4}
              stroke={chartConfig.cantidad.color}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
