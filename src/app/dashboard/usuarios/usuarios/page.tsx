import FormContainer from "@/components/forms/form-container";
import UsuariosContainer from "./users-container";
const headersUsers = [
  { key: "role", label: "Rol" },
  { key: "user", label: "Usuario" },
  { key: "name", label: "Nombre" },
  { key: "email", label: "Correo" },
  { key: "createdAt", label: "Creado" },
  { key: "updatedAt", label: "Actualizado" },
]
async function Page() {
  const API_ROLES_URL = process.env.HOST_URL + "/api/roles";
  const API_USUARIOS_URL = process.env.HOST_URL + "/api/usuarios";
  const res = await fetch(API_ROLES_URL, { cache: "no-store" });
  const roles = await res.json();
  const resP = await fetch(API_USUARIOS_URL, { cache: "no-store" });
  const usuarios = await resP.json();

  return (
    <div className="flex flex-col gap-4">
      <FormContainer title="Usuarios">
        <UsuariosContainer data={usuarios} headers={headersUsers} dataRoles={roles}/>
      </FormContainer>
    </div>
  );
}

export default Page;