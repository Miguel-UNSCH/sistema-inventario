import { DialogForm } from "@/components/dialog/dialog-form";
import FormContainer from "@/components/forms/form-container";
import { FormCategory } from "@/components/forms/form-category";
import CustomDataTable from "@/components/table/custom-data-table";

const data = [
  {
    category: "Electrónica",
    description: "Laptop HP con 16GB RAM y 512GB SSD.",
    createdById: "user123",
    createdAt: "2023-08-01T10:00:00Z", // Cadena de fecha
  },
  {
    category: "Electrónica",
    description: "Smartphone Samsung Galaxy S21.",
    createdById: "user456",
    createdAt: "2023-08-02T11:30:00Z", // Cadena de fecha
  },
  {
    category: "Electrónica",
    description: "Televisor LG 55 pulgadas 4K UHD.",
    createdById: "user123",
    createdAt: "2023-08-03T09:15:00Z", // Cadena de fecha
  },
  {
    category: "Electrónica",
    description: "Auriculares inalámbricos Bose con cancelación de ruido.",
    createdById: "user789",
    createdAt: "2023-08-04T12:45:00Z", // Cadena de fecha
  },
  {
    category: "Electrónica",
    description: "Impresora Epson EcoTank con wifi.",
    createdById: "user456",
    createdAt: "2023-08-05T08:20:00Z", // Cadena de fecha
  },
  {
    category: "Electrónica",
    description: "Reloj inteligente Garmin con GPS.",
    createdById: "user789",
    createdAt: "2023-08-06T15:10:00Z", // Cadena de fecha
  },
  {
    category: "Electrónica",
    description: "Tableta Apple iPad Pro de 12.9 pulgadas.",
    createdById: "user123",
    createdAt: "2023-08-07T16:30:00Z", // Cadena de fecha
  },
  {
    category: "Electrónica",
    description: "Altavoz Bluetooth JBL con sonido estéreo.",
    createdById: "user456",
    createdAt: "2023-08-08T14:00:00Z", // Cadena de fecha
  },
  {
    category: "Electrónica",
    description: "Cámara Canon EOS Rebel T7 con lente de 18-55mm.",
    createdById: "user789",
    createdAt: "2023-08-09T10:25:00Z", // Cadena de fecha
  },
  {
    category: "Electrónica",
    description: "Drone DJI Mini 2 con cámara 4K.",
    createdById: "user123",
    createdAt: "2023-08-10T11:55:00Z", // Cadena de fecha
  },
  {
    category: "Electrónica",
    description: "Monitor Dell de 27 pulgadas con resolución 1440p.",
    createdById: "user456",
    createdAt: "2023-08-11T09:05:00Z", // Cadena de fecha
  },
  {
    category: "Electrónica",
    description: "Teclado mecánico Razer BlackWidow con retroiluminación.",
    createdById: "user789",
    createdAt: "2023-08-12T13:15:00Z", // Cadena de fecha
  },
  {
    category: "Electrónica",
    description: "Disco duro externo Seagate de 2TB.",
    createdById: "user123",
    createdAt: "2023-08-13T08:40:00Z", // Cadena de fecha
  },
  {
    category: "Electrónica",
    description: "Ventilador Dyson con tecnología sin aspas.",
    createdById: "user456",
    createdAt: "2023-08-14T14:20:00Z", // Cadena de fecha
  },
  {
    category: "Electrónica",
    description: "Asistente de voz Amazon Echo Dot.",
    createdById: "user789",
    createdAt: "2023-08-15T15:30:00Z", // Cadena de fecha
  },
];


const headers = [
  { key: "category", label: "Categoria del producto" },
  { key: "description", label: "Descripción" },
  { key: "createdById", label: "Usuario" },
  { key: "createdAt", label: "Fecha de Creación" },
];

function Page() {
  return (
    <FormContainer title="CATEGORIAS">
      <div className="flex justify-between gap-4">
        <DialogForm textButton="Agregar Categoria" titleDialog="AGREGAR CATEGORIA" descriptionDialog="Agregar la categoria">
          <FormCategory />
        </DialogForm>
      </div>
      <CustomDataTable headers={headers} data={data} initialItemsPerPage={5} />
    </FormContainer>
  );
}

export default Page;
