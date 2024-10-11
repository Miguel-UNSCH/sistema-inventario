import { CustomPieChart } from "@/components/charts/pie-chart";
import { CardBlocks } from "@/components/blocks/card";
import FormContainer from "@/components/forms/form-container";

function Dashboard() {
  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">¡Hola Juan, Buen Día!</h1>
          <p className="text-base md:text-lg text-card-foreground">
            A continuación, presento los informes actualizados correspondientes al día de hoy.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          <CardBlocks />
          <CardBlocks />
          <CardBlocks />
        </div>
      </div>

      <div className="text-foreground">
        <FormContainer title="Reporte de ventas de este mes">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <CustomPieChart />
            <CustomPieChart />
            <CustomPieChart />
            <CustomPieChart />
          </div>
        </FormContainer>
      </div>
    </div>
  );
}

export default Dashboard;
