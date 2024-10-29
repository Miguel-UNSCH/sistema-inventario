import FormContainer from "@/components/forms/form-container";
import ProductoContainer from "./producto-container";
import { getProducts } from "@/actions/product-actions";
import { getCategoriesWithoutPermissions } from "@/actions/category-actions";

const headers = [
  { key: "productName", label: "Nombre Producto" },
  { key: "code", label: "Código" },
  { key: "description", label: "Descripción" },
  { key: "stockMinimo", label: "Stock mínimo" },
  { key: "category", label: "Categoría" },
  { key: "createdAt", label: "Creado" },
  { key: "updatedAt", label: "Actualizado" },
];

async function Page() {
  
  const productos = await getProducts()
  const categorias = await getCategoriesWithoutPermissions()

  if (typeof productos === "object" && "status" in productos) {
    return (
      <FormContainer title="Productos">
        <h1>{productos.message}</h1>
      </FormContainer>
    );
  }

  const validCategories = Array.isArray(categorias) ? categorias : [];

  return (
    <FormContainer title="Productos">
      <ProductoContainer data={productos} headers={headers} dataCategory={validCategories} />
    </FormContainer>
  );
}

export default Page;
