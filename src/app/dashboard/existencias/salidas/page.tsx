import FormContainer from "@/components/forms/form-container";
import { getEntradasWithoutPermissions } from "@/actions/entrada-actions";
import SalidasContainer from "./salidas-container";
import { getAllClientsWithoutPermissions } from "@/actions/client-actions";
import { getDetalleSalidas } from "@/actions/salida-actions";

const headers = [
  { key: "clienteName", label: "Cliente" },
  { key: "identifier", label: "(DNI/CE o RUC)" },
  { key: "productosVendidos", label: "Productos" },
  { key: "precioVentaTotal", label: "Total vendido" },
  { key: "createdAt", label: "Creado" },
  { key: "updatedAt", label: "Actualizado" },
];

// clienteName,
//         identifier,
//         productosVendidos,
//         precioVentaTotal: detalle.precioVentaTotal,
//         createdAt: formatDateTime(detalle.createdAt),
//         updatedAt: formatDateTime(detalle.updatedAt),

async function Page() {

  const detalleSalidas = await getDetalleSalidas()
  const products = await getEntradasWithoutPermissions()
  const clients = await getAllClientsWithoutPermissions()

  if (typeof detalleSalidas === "object" && "status" in detalleSalidas) {
    return (
      <FormContainer title="Productos">
        <h1>{detalleSalidas.message}</h1>
      </FormContainer>
    );
  }

  const validProducts = Array.isArray(products) ? products : [];
  const validClients = Array.isArray(clients) ? clients : [];

  return (
    <SalidasContainer data={detalleSalidas} headers={headers} products={validProducts} clients={validClients} />
  )
}

export default Page;