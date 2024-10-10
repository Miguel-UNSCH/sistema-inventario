import { CustomPieChart } from "@/components/charts/pie-chart";
import FormContainer from "@/components/forms/form-container";

function dashboard() {
  return (
    <div className="text-foreground">
      <FormContainer title="Reporte de ventas de este mes">
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <CustomPieChart />
          <CustomPieChart />
          <CustomPieChart />
          <CustomPieChart />
        </div>
      </FormContainer>
    </div>
  );
}

export default dashboard;
