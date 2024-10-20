import FormContainer from "@/components/forms/form-container";
import CategoriaContainer from "./categoria-container";
import { getCategories } from "@/actions/category-actions";

const headers = [
  { key: "category", label: "Categoria del producto" },
  { key: "description", label: "Descripción" },
  { key: "createdAt", label: "Creado" },
  { key: "updatedAt", label: "Actualizado" },
];


async function Page() {
  const categorias = await getCategories()

  if (typeof categorias === "object" && "status" in categorias) {
    return (
      <FormContainer title="Categorias">
        <h1>{categorias.message}</h1>
      </FormContainer>
    );
  }

  return (
    <FormContainer title="Categorias">
      <CategoriaContainer data={categorias} headers={headers} />
    </FormContainer>
  );
}

export default Page;
