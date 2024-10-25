import FormContainer from "@/components/forms/form-container";
import EntradasContainer from "./entradas-container";
import { getEntradas } from "@/actions/entrada-actions";
import { getUnidades } from "@/actions/unidad-actions";
import { getProductWithoutPermissions } from "@/actions/product-actions";
import { getSupplierWithoutPermissions } from "@/actions/supplier-actions";

const headers = [
  { key: "productName", label: "Nombre Producto" },
  { key: "code", label: "Código" },
  { key: "cantidad", label: "Cantidad" },
  { key: "unidad", label: "Unidad Medida" },
  { key: "category", label: "Categoría" },
  { key: "supplier", label: "Proveedor" },
  { key: "precioCompra", label: "Precio compra" },
  { key: "precioVenta", label: "Precio venta" },
  { key: "createdAt", label: "Creado" },
  { key: "updatedAt", label: "Actualizado" },
];

async function Page() {

  const entradas = await getEntradas()
  const unidadesMedida = await getUnidades()
  const products = await getProductWithoutPermissions()
  const suppliers = await getSupplierWithoutPermissions()

  if (typeof entradas === "object" && "status" in entradas) {
    return (
      <FormContainer title="Productos">
        <h1>{entradas.message}</h1>
      </FormContainer>
    );
  }

  const validUnidades = Array.isArray(unidadesMedida) ? unidadesMedida : [];
  const validProducts = Array.isArray(products) ? products : [];
  const validSuppliers = Array.isArray(suppliers) ? suppliers : [];

  return (
    <EntradasContainer data={entradas} headers={headers} products={validProducts} unidadesMedida={validUnidades} suppliers={validSuppliers} />
  )
}

export default Page;
