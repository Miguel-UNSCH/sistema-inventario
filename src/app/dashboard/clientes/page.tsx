import FormContainer from "@/components/forms/form-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientesNaturalContainer from "./clientes-natural-container";
import ClientesJuridicoContainer from "./clientes-juridico-container";

const data = [
  {
    firstName: "Carlos",
    lastName: "Perez",
    identifier: "12345678",
    email: "carlos.perez@example.com",
    phone: "987654321",
    address: "Av. Los Alamos 123",
    createdBy: { userId: "u1", name: "Admin User" },
  },
  {
    firstName: "Lucia",
    lastName: "Martinez",
    dni: "87654321",
    email: "lucia.martinez@example.com",
    phone: "912345678",
    address: "Jr. Puno 456",
  },
  {
    firstName: "Jorge",
    lastName: "Ramirez",
    email: "jorge.ramirez@example.com",
    phone: "934567890",
    createdBy: { userId: "u2", name: "Moderator" },
  },
  {
    firstName: "Ana",
    lastName: "Fernandez",
    dni: "23456789",
    email: "ana.fernandez@example.com",
    phone: "987654322",
    createdBy: { userId: "u3", name: "Coordinator" },
  },
];

const headers = [
  { key: "firstName", label: "Nombre" },
  { key: "lastName", label: "Apellido" },
  { key: "identifier", label: "Identificación" },
  { key: "email", label: "Correo Electrónico" },
  { key: "phone", label: "Teléfono" },
  { key: "address", label: "Dirección" },
];

function Page() {
  return (
    <FormContainer title="Clientes">
      <Tabs defaultValue="persona-natural" className="w-full">
        <TabsList>
          <TabsTrigger value="persona-natural">Persona Natural</TabsTrigger>
          <TabsTrigger value="persona-juridica">Persona Jurídica</TabsTrigger>
        </TabsList>
        <TabsContent value="persona-natural" className="flex flex-col gap-4">
          <ClientesNaturalContainer data={data} headers={headers}/>
        </TabsContent>
        <TabsContent value="persona-juridica" className="flex flex-col gap-4">
          <ClientesJuridicoContainer data={data} headers={headers}/>
        </TabsContent>
      </Tabs>
    </FormContainer>
  );
}

export default Page;
