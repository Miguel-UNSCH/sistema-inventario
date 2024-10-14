import FormContainer from "@/components/forms/form-container";
import CategoriaContainer from "./categoria-conteiner";

const headers = [
  { key: "category", label: "Categoria del producto" },
  { key: "description", label: "Descripción" },
  { key: "createdAt", label: "Creado" },
  { key: "updatedAt", label: "Actualizado" },
];


async function Page() {

  const API_URL = process.env.HOST_URL + '/api/categorias'
  const res = await fetch(API_URL, { cache: 'no-store' })
  const categorias = await res.json()

  return (
    <FormContainer title="CATEGORIAS">
      <CategoriaContainer data={categorias} headers={headers} />
    </FormContainer>
  );
}

export default Page;
