import FormContainer from "@/components/forms/form-container";
import RoleContainer from "./role-container";
import PermissionContainer from "./permission-container";

const headersRole = [
  { key: "name", label: "Nombre" },
  { key: "description", label: "Descripción" },
  { key: "users", label: "Usuarios" },
  { key: "permissions", label: "Permisos" },
  { key: "createdAt", label: "Creado" },
  { key: "updatedAt", label: "Actualizado" },
];

const headersPermissions = [
  { key: "role", label: "Rol" },
  { key: "module", label: "Módulo" },
  { key: "action", label: "Acciones" },
  { key: "createdAt", label: "Creado" },
  { key: "updatedAt", label: "Actualizado" },
]

async function Page() {
  const API_ROLES_URL = process.env.HOST_URL + "/api/roles";
  const API_PERMISOS_URL = process.env.HOST_URL + "/api/permisos";
  const res = await fetch(API_ROLES_URL, { cache: "no-store" });
  const roles = await res.json();

  const resP = await fetch(API_PERMISOS_URL, { cache: "no-store" });
  const permisos = await resP.json();

  return (
    <div className="flex flex-col gap-4">
      <FormContainer title="Roles">
        <RoleContainer data={roles} headers={headersRole} />
      </FormContainer>
      <FormContainer title="Permisos">
        <PermissionContainer data={permisos} headers={headersPermissions} dataRoles={roles}/>
      </FormContainer>
    </div>
  );
}

export default Page;
