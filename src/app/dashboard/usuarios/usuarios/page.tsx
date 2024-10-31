import FormContainer from "@/components/forms/form-container";
import UsuariosContainer from "./users-container";
import { getUsers } from "@/actions/user-actions";
import { getRoleWhitoutPermissions } from "@/actions/role-actions";
const headersUsers = [
  { key: "role", label: "Rol" },
  { key: "user", label: "Usuario" },
  { key: "name", label: "Nombre" },
  { key: "email", label: "Correo" },
  { key: "createdAt", label: "Creado" },
  { key: "updatedAt", label: "Actualizado" },
]
async function Page() {
  const roles = await getRoleWhitoutPermissions();
  const usuarios = await getUsers();

  if (typeof usuarios === "object" && "status" in usuarios) {
    return (
      <FormContainer title="Usuarios">
        <h1>{usuarios.message}</h1>
      </FormContainer>
    );
  }

  const validRoles = Array.isArray(roles) ? roles : [];

  return (
    <div className="flex flex-col gap-4">
      <FormContainer title="Usuarios">
        <UsuariosContainer data={usuarios} headers={headersUsers} dataRoles={validRoles}/>
      </FormContainer>
    </div>
  );
}

export default Page;