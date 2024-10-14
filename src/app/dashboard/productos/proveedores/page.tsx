import FormContainer from "@/components/forms/form-container";
import ProveedorContainer from "./proveedor-conteiner";


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
  const API_URL = process.env.HOST_URL + '/api/proveedores'
  const res = await fetch(API_URL, { cache: 'no-store' })
  const proveedores = await res.json()

  return (
    <FormContainer title="PROVEEDORES">
      <ProveedorContainer data={proveedores} headers={headers} />
    </FormContainer>
  );
}

export default Page;
