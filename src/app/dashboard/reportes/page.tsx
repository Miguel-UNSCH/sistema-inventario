// function Page() {
//   return (
//     <>
//       Generación de reportes por módulos (ventas, entradas, salidas, stock, auditorías).
//       Filstro por fechas, categorías, proveedores y clientes.
//       Exportación de datos (PDF, Excel).
//     </>
//   )
// }
// export default Page;

import FormContainer from "@/components/forms/form-container";
import ReportesConteiner from "./reportes-conteiner";
import { getCategoriesWithoutPermissions } from "@/actions/category-actions"
import { getProductWithoutPermissions } from "@/actions/product-actions"
import { getSalidasReporte } from "@/actions/salida-actions"

async function Page() {

  const categorias = await getCategoriesWithoutPermissions()
  const productos = await getProductWithoutPermissions()
  const salidas = await getSalidasReporte()

  const validCategorias = Array.isArray(categorias) ? categorias : [];
  const validProductos = Array.isArray(productos) ? productos : [];
  const validSalidas = Array.isArray(salidas) ? salidas : [];

  return (
    <FormContainer title="Reportes">
      <ReportesConteiner dataCategy={validCategorias} dataProduct={validProductos} dataSalidas={validSalidas}/>
    </FormContainer>
  );
}
export default Page;