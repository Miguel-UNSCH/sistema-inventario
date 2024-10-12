import { DialogForm } from "@/components/dialog/dialog-form";
import FormContainer from "@/components/forms/form-container";
import { FormProduct } from "@/components/forms/form-product";
import CustomDataTable from "@/components/table/custom-data-table";

const data = [
  {
    ProductName: "Laptop HP",
    code: "LP1234",
    descripción: "Laptop HP con 16GB RAM y 512GB SSD.",
    price: 1200.00,
    stock: 50,
    category: "Electrónica",
    supplier: "Proveedor A" // Añadido proveedor
  },
  {
    ProductName: "Smartphone Samsung",
    code: "SS5678",
    descripción: "Smartphone Samsung Galaxy S21.",
    price: 800.00,
    stock: 30,
    category: "Electrónica",
    supplier: "Proveedor B" // Añadido proveedor
  },
  {
    ProductName: "Silla de Oficina",
    code: "SO9101",
    descripción: "Silla ergonómica ajustable.",
    price: 150.00,
    stock: 100,
    category: "Muebles",
    supplier: "Proveedor C" // Añadido proveedor
  },
  {
    ProductName: "Mesa de Comedor",
    code: "MC2345",
    descripción: "Mesa de comedor de madera para 6 personas.",
    price: 300.00,
    stock: 20,
    category: "Muebles",
    supplier: "Proveedor D" // Añadido proveedor
  },
  {
    ProductName: "Teclado Mecánico",
    code: "TM6789",
    descripción: "Teclado mecánico RGB con retroiluminación.",
    price: 100.00,
    stock: 75,
    category: "Accesorios",
    supplier: "Proveedor A" // Añadido proveedor
  },
  {
    ProductName: "Auriculares Bluetooth",
    code: "AB3456",
    descripción: "Auriculares inalámbricos con cancelación de ruido.",
    price: 200.00,
    stock: 40,
    category: "Electrónica",
    supplier: "Proveedor B" // Añadido proveedor
  },
  {
    ProductName: "Reloj Inteligente",
    code: "RI7890",
    descripción: "Reloj inteligente con monitoreo de salud.",
    price: 250.00,
    stock: 35,
    category: "Electrónica",
    supplier: "Proveedor C" // Añadido proveedor
  },
  {
    ProductName: "Cámara Digital",
    code: "CD1234",
    descripción: "Cámara digital de 24MP con lente intercambiable.",
    price: 900.00,
    stock: 15,
    category: "Fotografía",
    supplier: "Proveedor D" // Añadido proveedor
  },
  {
    ProductName: "Impresora Multifuncional",
    code: "IM5678",
    descripción: "Impresora, escáner y copiadora todo en uno.",
    price: 300.00,
    stock: 25,
    category: "Electrónica",
    supplier: "Proveedor A" // Añadido proveedor
  },
  {
    ProductName: "Lámpara LED",
    code: "LL9101",
    descripción: "Lámpara LED regulable para escritorio.",
    price: 50.00,
    stock: 60,
    category: "Iluminación",
    supplier: "Proveedor B" // Añadido proveedor
  },
  {
    ProductName: "Bicicleta de Montaña",
    code: "BM2345",
    descripción: "Bicicleta de montaña con suspensión.",
    price: 500.00,
    stock: 20,
    category: "Deportes",
    supplier: "Proveedor C" // Añadido proveedor
  },
  {
    ProductName: "Cafetera Eléctrica",
    code: "CE6789",
    descripción: "Cafetera eléctrica con función de temporizador.",
    price: 80.00,
    stock: 30,
    category: "Electrodomésticos",
    supplier: "Proveedor D" // Añadido proveedor
  },
  {
    ProductName: "Robot Aspirador",
    code: "RA3456",
    descripción: "Robot aspirador inteligente con mapeo.",
    price: 400.00,
    stock: 10,
    category: "Electrodomésticos",
    supplier: "Proveedor A" // Añadido proveedor
  },
  {
    ProductName: "Set de Cuchillos",
    code: "SC7890",
    descripción: "Set de cuchillos de cocina profesional.",
    price: 120.00,
    stock: 50,
    category: "Cocina",
    supplier: "Proveedor B" // Añadido proveedor
  },
  {
    ProductName: "Mochila para Laptop",
    code: "ML2345",
    descripción: "Mochila con compartimento para laptop de 15 pulgadas.",
    price: 70.00,
    stock: 45,
    category: "Accesorios",
    supplier: "Proveedor C" // Añadido proveedor
  },
];

const headers = [
  { key: "ProductName", label: "Nombre Producto" },
  { key: "code", label: "Código" },
  { key: "descripción", label: "Descripción" },
  { key: "price", label: "Precio" },
  { key: "stock", label: "Reservas" },
  { key: "category", label: "Categoría" },
  { key: "supplier", label: "Proveedor" }, // Campo de proveedor añadido
];


function Page() {
  return (
    <FormContainer title="PRODUCTOS">
      <div className="flex justify-between gap-4">
        <DialogForm textButton="Agregar un producto" titleDialog="REGISTRO DE PRODUCTO" descriptionDialog="Agrega un nuevo producto">
          <FormProduct />
        </DialogForm>
      </div>
      <CustomDataTable headers={headers} data={data} initialItemsPerPage={5} />
    </FormContainer>
  );
}

export default Page;
