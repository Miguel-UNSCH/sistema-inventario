import FormContainer from "@/components/forms/form-container";
import ProductoContainer from "./producto-container";

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

  const API_PRODUCT_URL = process.env.HOST_URL + '/api/productos'
  const resProd = await fetch(API_PRODUCT_URL, { cache: 'no-store' })
  const productos = await resProd.json()

  const API_PROVEEDOR_URL = process.env.HOST_URL + '/api/proveedores'
  const resProv = await fetch(API_PROVEEDOR_URL, { cache: 'no-store' })
  const proveedores = await resProv.json()

  const API_CAT_URL = process.env.HOST_URL + '/api/categorias'
  const resCat = await fetch(API_CAT_URL, { cache: 'no-store' })
  const categorias = await resCat.json()

  return (
    <FormContainer title="PRODUCTOS">
      <ProductoContainer data={productos} headers={headers} dataCategory={categorias} dataSupplier={proveedores} />
    </FormContainer>
  );
}

export default Page;
