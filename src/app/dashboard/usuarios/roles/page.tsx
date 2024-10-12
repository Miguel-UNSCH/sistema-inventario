import FormContainer from "@/components/forms/form-container";
import RoleContainer from "./role-container";

const headers = [
  { key: "name", label: "Nombre" },
  { key: "description", label: "Descripción" },
  { key: "users", label: "Usuarios" },
  { key: "permissions", label: "Permisos" },
  { key: "createdAt", label: "Creado" },
  { key: "updatedAt", label: "Actualizado" },
];

async function Page() {

  const API_URL = process.env.HOST_URL + '/api/roles'
  const res = await fetch(API_URL, {cache: 'no-store'})
  const roles = await res.json()

  return (
    <FormContainer title="Roles">
      <RoleContainer data={roles} headers={headers}/>
    </FormContainer>
  );
}

export default Page;
