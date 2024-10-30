import FormContainer from "@/components/forms/form-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientesNaturalContainer from "./clientes-natural-container";
import ClientesJuridicoContainer from "./clientes-juridico-container";
import { getClientsJuridico, getClientsNatural } from "@/actions/client-actions";

const headersNatural = [
  { key: "firstName", label: "Nombre" },
  { key: "lastName", label: "Apellido" },
  { key: "identifier", label: "Identificación" },
  { key: "email", label: "Correo Electrónico" },
  { key: "phone", label: "Teléfono" },
  { key: "address", label: "Dirección" },
];

const headersJuridico = [
  { key: "companyName", label: "Razón Social" },
  { key: "companyType", label: "Tipo" },
  { key: "ruc", label: "RUC" },
  { key: "representativeName", label: "Representante" },
  { key: "representativePosition", label: "Cargo Representante" },
  { key: "email", label: "Correo Electrónico" },
  { key: "phone", label: "Teléfono" },
  { key: "address", label: "Dirección" },
];

async function Page() {

  const clientesNatural = await getClientsNatural()
  const clientesJuridico = await getClientsJuridico()

  if (typeof clientesNatural === "object" && "status" in clientesNatural) {
    return (
      <FormContainer title="Clientes">
        <h1>{clientesNatural.message}</h1>
      </FormContainer>
    );
  }

  if (typeof clientesJuridico === "object" && "status" in clientesJuridico) {
    return (
      <FormContainer title="Clientes">
        <h1>{clientesJuridico.message}</h1>
      </FormContainer>
    );
  }
  
  return (
    <FormContainer title="Clientes">
      <Tabs defaultValue="persona-natural" className="w-full">
        <TabsList>
          <TabsTrigger value="persona-natural">Persona Natural</TabsTrigger>
          <TabsTrigger value="persona-juridica">Persona Jurídica</TabsTrigger>
        </TabsList>
        <TabsContent value="persona-natural" className="flex flex-col gap-4">
          <ClientesNaturalContainer data={clientesNatural} headers={headersNatural}/>
        </TabsContent>
        <TabsContent value="persona-juridica" className="flex flex-col gap-4">
          <ClientesJuridicoContainer data={clientesJuridico} headers={headersJuridico}/>
        </TabsContent>
      </Tabs>
    </FormContainer>
  );
}

export default Page;
