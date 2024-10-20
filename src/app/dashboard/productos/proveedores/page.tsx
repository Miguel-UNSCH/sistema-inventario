import FormContainer from "@/components/forms/form-container";
import ProveedorContainer from "./proveedor-conteiner";
import { getSuppliers } from "@/actions/supplier-actions";


const headers = [
  { key: "supplierName", label: "Nombre del Proveedor" },
  { key: "ruc", label: "RUC" },
  { key: "email", label: "Correo Electrónico" },
  { key: "phone", label: "Teléfono" },
  { key: "address", label: "Dirección" },
  { key: "createdAt", label: "Creado" },
  { key: "updatedAt", label: "Actualizado" },
];

async function Page() {
  const proveedores = await getSuppliers()

  if (typeof proveedores === "object" && "status" in proveedores) {
    return (
      <FormContainer title="Proveedores">
        <h1>{proveedores.message}</h1>
      </FormContainer>
    );
  }

  return (
    <FormContainer title="Proveedores">
      <ProveedorContainer data={proveedores} headers={headers} />
    </FormContainer>
  );
}

export default Page;
