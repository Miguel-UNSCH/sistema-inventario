"use client";

import { CustomPieChart } from "@/components/charts/pie-chart";



export function ComponentCustomPieChart() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <CustomPieChart />
            <CustomPieChart />
            <CustomPieChart />
            <CustomPieChart />
        </div>
    )
}

export default ComponentCustomPieChart;
