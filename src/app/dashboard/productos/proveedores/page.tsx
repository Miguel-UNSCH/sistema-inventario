import { DialogForm } from "@/components/dialog/dialog-form";
import FormContainer from "@/components/forms/form-container";
import { FormSupplier } from "@/components/forms/form-sellers";
import CustomDataTable from "@/components/table/custom-data-table";

const data = [
  {
    supplierName: "Proveedor A",
    ruc: "12345678901",
    email: "contacto@proveedora.com",
    phone: "987654321",
    address: "Av. Principal 123, Ciudad A",
  },
  {
    supplierName: "Proveedor B",
    ruc: "23456789012",
    email: "info@proveedorb.com",
    phone: "976543210",
    address: "Calle Secundaria 456, Ciudad B",
  },
  {
    supplierName: "Proveedor C",
    ruc: "34567890123",
    email: "contacto@proveedorc.com",
    phone: "965432109",
    address: "Pasaje Tercero 789, Ciudad C",
  },
  {
    supplierName: "Proveedor D",
    ruc: "45678901234",
    email: "sales@proveedord.com",
    phone: "954321098",
    address: "Av. Libertad 321, Ciudad D",
  },
  {
    supplierName: "Proveedor E",
    ruc: "56789012345",
    email: "support@proveedore.com",
    phone: "943210987",
    address: "Calle Ejemplo 654, Ciudad E",
  },
  {
    supplierName: "Proveedor F",
    ruc: "67890123456",
    email: "contact@proveedorf.com",
    phone: "932109876",
    address: "Calle Prueba 987, Ciudad F",
  },
  {
    supplierName: "Proveedor G",
    ruc: "78901234567",
    email: "info@proveedorg.com",
    phone: "921098765",
    address: "Calle Principal 321, Ciudad G",
  },
  {
    supplierName: "Proveedor H",
    ruc: "89012345678",
    email: "sales@proveedorh.com",
    phone: "910987654",
    address: "Calle Industrial 654, Ciudad H",
  },
  {
    supplierName: "Proveedor I",
    ruc: "90123456789",
    email: "contacto@proveedori.com",
    phone: "909876543",
    address: "Calle Comercio 987, Ciudad I",
  },
  {
    supplierName: "Proveedor J",
    ruc: "01234567890",
    email: "info@proveedorj.com",
    phone: "898765432",
    address: "Calle Central 123, Ciudad J",
  },
  {
    supplierName: "Proveedor K",
    ruc: "12345678901",
    email: "sales@proveedork.com",
    phone: "876543210",
    address: "Calle Norte 456, Ciudad K",
  },
  {
    supplierName: "Proveedor L",
    ruc: "23456789012",
    email: "contacto@proveedorl.com",
    phone: "865432109",
    address: "Calle Este 789, Ciudad L",
  },
  {
    supplierName: "Proveedor M",
    ruc: "34567890123",
    email: "info@proveedorm.com",
    phone: "854321098",
    address: "Calle Sur 321, Ciudad M",
  },
  {
    supplierName: "Proveedor N",
    ruc: "45678901234",
    email: "support@proveedorn.com",
    phone: "843210987",
    address: "Calle Oeste 654, Ciudad N",
  },
  {
    supplierName: "Proveedor O",
    ruc: "56789012345",
    email: "contact@proveedoro.com",
    phone: "832109876",
    address: "Calle 6 987, Ciudad O",
  },
];



const headers = [
  { key: "supplierName", label: "Nombre del Proveedor" },
  { key: "ruc", label: "RUC" },
  { key: "email", label: "Correo Electrónico" },
  { key: "phone", label: "Teléfono" },
  { key: "address", label: "Dirección" },
];



function Page() {
  return (
    <FormContainer title="PROVEEDORES">
      <div className="flex justify-between gap-4">
        <DialogForm textButton="Agregar un proveedor" titleDialog="REGISTRO DE PROVEEDORES" descriptionDialog="Agrega un nuevo proveedor">
          <FormSupplier />
        </DialogForm>
      </div>
      <CustomDataTable headers={headers} data={data} initialItemsPerPage={5} />
    </FormContainer>
  );
}

export default Page;
