import { DialogForm } from "@/components/dialog/dialog-form";
import FormContainer from "@/components/forms/form-container";
import { FormClientePersonaJuridica } from "@/components/forms/form-persona-juridica";
import { FormClientePersonaNatural } from "@/components/forms/form-persona-natural";
import CustomDataTable from "@/components/table/custom-data-table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  {
    firstName: "Marcos",
    lastName: "Torres",
    email: "marcos.torres@example.com",
    phone: "912345679",
    passport: "XYZ987654",
  },
  {
    firstName: "Claudia",
    lastName: "Vega",
    dni: "12345679",
    email: "claudia.vega@example.com",
    phone: "934567891",
    address: "Calle Libertad 321",
    createdBy: { userId: "u4", name: "Admin User" },
  },
  {
    firstName: "Luis",
    lastName: "Garcia",
    email: "luis.garcia@example.com",
    phone: "956789012",
    address: "Av. Amazonas 123",
  },
  {
    firstName: "Paula",
    lastName: "Sanchez",
    dni: "34567890",
    email: "paula.sanchez@example.com",
    phone: "923456789",
    createdBy: { userId: "u5", name: "Admin" },
  },
  {
    firstName: "Martin",
    lastName: "Diaz",
    email: "martin.diaz@example.com",
    phone: "987654323",
    createdBy: { userId: "u6", name: "User Manager" },
  },
  {
    firstName: "Andrea",
    lastName: "Rodriguez",
    dni: "45678901",
    email: "andrea.rodriguez@example.com",
    phone: "987654324",
    address: "Calle Las Flores 654",
  },
  {
    firstName: "Ricardo",
    lastName: "Mendoza",
    email: "ricardo.mendoza@example.com",
    phone: "923456781",
    passport: "LMN654321",
    createdBy: { userId: "u7", name: "System Admin" },
  },
  {
    firstName: "Karla",
    lastName: "Gomez",
    dni: "56789012",
    email: "karla.gomez@example.com",
    phone: "923456780",
    address: "Jr. San Martin 345",
  },
  {
    firstName: "Fernando",
    lastName: "Lopez",
    email: "fernando.lopez@example.com",
    phone: "912345671",
    createdBy: { userId: "u8", name: "Supervisor" },
  },
  {
    firstName: "Gabriela",
    lastName: "Rojas",
    dni: "67890123",
    email: "gabriela.rojas@example.com",
    phone: "923456789",
    createdBy: { userId: "u9", name: "Admin User" },
  },
  {
    firstName: "Daniel",
    lastName: "Ortega",
    dni: "78901234",
    email: "daniel.ortega@example.com",
    phone: "934567890",
    address: "Av. Grau 123",
  },
  {
    firstName: "Silvia",
    lastName: "Paredes",
    email: "silvia.paredes@example.com",
    phone: "987654325",
    passport: "DEF123456",
    createdBy: { userId: "u10", name: "User Admin" },
  },
  {
    firstName: "Jose",
    lastName: "Cruz",
    dni: "89012345",
    email: "jose.cruz@example.com",
    phone: "923456783",
    createdBy: { userId: "u11", name: "Manager" },
  },
  {
    firstName: "Esteban",
    lastName: "Castro",
    email: "esteban.castro@example.com",
    phone: "912345672",
    address: "Av. Las Palmeras 456",
  },
  {
    firstName: "Mariana",
    lastName: "Vargas",
    dni: "90123456",
    email: "mariana.vargas@example.com",
    phone: "987654326",
    createdBy: { userId: "u12", name: "Admin" },
  },
  {
    firstName: "Ruben",
    lastName: "Reyes",
    email: "ruben.reyes@example.com",
    phone: "923456785",
    passport: "QRS987654",
    address: "Calle El Sol 789",
  },
  {
    firstName: "Carmen",
    lastName: "Salas",
    dni: "01234567",
    email: "carmen.salas@example.com",
    phone: "912345673",
    createdBy: { userId: "u13", name: "System Admin" },
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
          <div className="flex justify-between gap-4">
            <DialogForm textButton="Agregar persona natural" titleDialog="Cliente nuevo (Persona natural)" descriptionDialog="Agrega un cliente nuevo">
              <FormClientePersonaNatural />
            </DialogForm>
          </div>
          <CustomDataTable headers={headers} data={data} initialItemsPerPage={5} />
        </TabsContent>
        <TabsContent value="persona-juridica" className="flex flex-col gap-4">
          <div className="flex justify-between gap-4">
            <DialogForm textButton="Agregar persona jurídica" titleDialog="Cliente nuevo (persona jurídica)" descriptionDialog="Agrega un cliente nuevo">
              <FormClientePersonaJuridica />
            </DialogForm>
          </div>
          <CustomDataTable headers={headers} data={data} initialItemsPerPage={10} />
        </TabsContent>
      </Tabs>
    </FormContainer>
  );
}

export default Page;
