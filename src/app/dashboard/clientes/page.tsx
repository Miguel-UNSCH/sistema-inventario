import FormContainer from "@/components/forms/form-container";
import TextLabelInput from "@/components/input/input-type2";
import CustomDataTable from "@/components/table/custom-data-table";
import { Input } from "@/components/ui/input";

const data = [
  { nombres: "John", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "John", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
  { nombres: "Jane", apellidoPaterno: "Doe", apellidoMaterno: "Doe", dni: "87654321" },
];

const headers = [
  { key: "nombres", label: "Nombres" },
  { key: "apellidoPaterno", label: "Apellido paterno" },
  { key: "apellidoMaterno", label: "Apellido materno" },
  { key: "dni", label: "DNI" },
];

function Page() {
  return (
    <div className="flex flex-col gap-4">
      <FormContainer title="Clientes (Persona natural)">
      <TextLabelInput label="Nombres" isRequired id="1" type="number"/>
      Clientes
      <CustomDataTable headers={headers} data={data} initialItemsPerPage={5}/>
    </FormContainer>
    <FormContainer title="Clientes (persona jurídica)">
      Clientes
      <CustomDataTable headers={headers} data={data} itemsPerPageOptions={[10, 20, 30, 40]} initialItemsPerPage={10}/>
    </FormContainer>
    </div>
  )
}

export default Page;
