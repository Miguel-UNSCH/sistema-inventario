"use client";

import * as React from "react";
import { Label, Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define las propiedades que aceptará el componente
interface CustomPieChartProps {
  chartData: {
    fecha: string;
    cantidadVentas: number;
    categoria: string;
    ventaTotal: number;
  }[]; // Asegúrate de que esta estructura es correcta
}

const chartConfig = {
  cantidadVentas: {
    label: "Ventas",
  },
} satisfies ChartConfig;

export function CustomPieChart({ chartData }: CustomPieChartProps) {
  // Calcular total de ventas y total recaudado
  const totalVentas = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.cantidadVentas, 0);
  }, [chartData]);

  const totalRevenue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.ventaTotal, 0);
  }, [chartData]);

  // Función para determinar el color del segmento basado en la cantidad de ventas
  const getColor = (cantidadVentas: number) => {
    if (cantidadVentas === 0) {
      return "var(--chart-3)"; // Color para 0 ventas
    } else if (cantidadVentas < 10) {
      return "var(--chart-2)"; // Color para pocas ventas
    } else {
      return "var(--chart-1)"; // Color para muchas ventas
    }
  };

  // Asegúrate de que haya al menos un elemento en el chartData
  const pieData = chartData.length > 0 ? chartData : [{ fecha: "Sin datos", cantidadVentas: 0, categoria: "N/A", ventaTotal: 0 }];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Carta de detalles</CardTitle>
        <CardDescription>{pieData[0].fecha}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieData}
              dataKey="cantidadVentas"
              nameKey="categoria"
              innerRadius={60}
              strokeWidth={5}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.cantidadVentas)} />
              ))}
              <Label
                content={({ viewBox }) => {
                  // Cast viewBox to the appropriate type
                  const { cx, cy } = viewBox as { cx: number; cy: number }; // Ensure cx and cy are defined
                  return (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={cx}
                        y={cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalVentas > 0 ? totalVentas.toLocaleString() : "0"}
                      </tspan>
                      <tspan
                        x={cx}
                        y={(cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Ventas
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Categoria: {pieData.length > 0 ? pieData[0].categoria : "N/A"}
        </div>
        <div className="leading-none text-muted-foreground">
          Total Recaudado: S/. {totalRevenue.toFixed(2)}
        </div>
      </CardFooter>
    </Card>
  );
}
