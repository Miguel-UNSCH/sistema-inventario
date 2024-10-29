import FormContainer from "@/components/forms/form-container";
import StockConteiner from "./stock-conteiner";
import { getCategories } from "@/actions/category-actions";
import { getProducts } from "@/actions/product-actions"
import { getEntradas } from "@/actions/entrada-actions"

async function Page() {
  const categorias = await getCategories()
  const productos = await getProducts()
  const entradas = await getEntradas()

  const validCategories = Array.isArray(categorias) ? categorias : [];
  const validProductos = Array.isArray(productos) ? productos : [];
  const validEntradas = Array.isArray(entradas) ? entradas : [];

  return (
    <FormContainer title="Almacenamiento">
      <StockConteiner dataProduct={validProductos} dataCategory={validCategories} dataEntradas={validEntradas} />
    </FormContainer>
  );
}
export default Page;