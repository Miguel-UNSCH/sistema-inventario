import FormContainer from "@/components/forms/form-container";
import RoleContainer from "./role-container";
import PermissionContainer from "./permission-container";
import { getRoles } from "@/actions/role-actions";
import { getPermissions } from "@/actions/permission-actions";

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
  const roles = await getRoles();
  const permisos = await getPermissions();

  if (typeof roles === "object" && "status" in roles) {
    return (
      <FormContainer title="Roles">
        <h1>{roles.message}</h1>
      </FormContainer>
    );
  }

  if (typeof permisos === "object" && "status" in permisos) {
    return (
      <FormContainer title="Roles">
        <h1>{permisos.message}</h1>
      </FormContainer>
    );
  }

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
