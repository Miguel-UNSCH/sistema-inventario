import FormContainer from "@/components/forms/form-container";
import ProductoContainer from "./producto-conteiner";

const headers = [
  { key: "productName", label: "Nombre Producto" },
  { key: "code", label: "Código" },
  { key: "description", label: "Descripción" },
  { key: "price", label: "Precio" },
  { key: "stock", label: "stock" },
  { key: "category", label: "Categoría" },
  { key: "supplier", label: "Proveedor" },
  { key: "createdAt", label: "Creado" },
  { key: "updatedAt", label: "Actualizado" }, // Campo de proveedor añadido
];


async function Page() {

  const API_URL = process.env.HOST_URL + '/api/productos'
  const res = await fetch(API_URL, { cache: 'no-store' })
  const productos = await res.json()

  return (
    <FormContainer title="PRODUCTOS">
      <ProductoContainer data={productos} headers={headers} />
    </FormContainer>
  );
}

export default Page;
