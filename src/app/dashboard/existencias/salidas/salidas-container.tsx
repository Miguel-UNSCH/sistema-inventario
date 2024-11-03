/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { confirmVenta, deleteSalida, getDetalleComprobante, getIdSalidaDetalle, getSalidas } from "@/actions/salida-actions";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import FormContainer from "@/components/forms/form-container";
import { FormSalida } from "@/components/forms/form-salida";
import CustomDataTable from "@/components/table/custom-data-table";
import TableVentas from "@/components/table/table-ventas";
import toasterCustom from "@/components/toaster-custom";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { toast } from "sonner";

import { pdf } from '@react-pdf/renderer';
import PDF from '@/components/pdf/PDF';

interface SalidasContainerProps {
  data: Record<string, any>[];
  headers: { key: string; label: string }[];
  products: Record<string, any>[];
  clients: Record<string, any>[];
}

const headersSalida = [
  { key: "productName", label: "Nombre Producto" },
  { key: "code", label: "Código" },
  { key: "cantidad", label: "Cantidad" },
  { key: "unidad", label: "Unidad Medida" },
  { key: "precioVenta", label: "Precio venta" },
  { key: "descuento", label: "Descuento" },
  { key: "createdAt", label: "Creado" },
  { key: "updatedAt", label: "Actualizado" },
];

type Salida = {
  id: string;
  productId: string;
  productName: string;
  code: string;
  cantidad: number;
  unidad: string;
  precioVenta: number;
  descuento: number | null;
  createdAt: string;
  updatedAt: string;
  entradaId: string; // Añadido
  clientId: string; // Añadido
  tipoDescuento?: string; // Si también es necesario
};

type SalidaDetalleResult = string | { message: string; status: number };

function SalidasContainer({ data, headers, products, clients }: SalidasContainerProps) {
  const [dataSalidas, setDataSalidas] = useState<Salida[]>([]);

  const productsOptions = products.map((product) => {
    return { value: String(product.id), label: String(product.productName) };
  });

  const clientOptions = clients.map((client) => {
    return { value: String(client.id), label: client.companyName ? String(client.companyName) : String(client.firstName + " " + client.lastName) };
  });

  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const [itemDeleted, setItemDeleted] = useState<Record<string, any> | null>(null);
  const [itemEditing, setItemEditing] = useState<Record<string, any> | null>(null);

  const [clientData, setClientData] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenConfirmDelete = (item: Record<string, any>) => {
    setItemDeleted(item);
    setOpenConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenEdit = (item: Record<string, any>) => {
    setItemEditing(item);
  };


  const handleClientId = async (item: string | null) => {
    const client = clients.find((client) => client.id === item);
    if (client && item) {
      setClientData(client);
      const dataSalidaClient = await getSalidas(item);
      if (Array.isArray(dataSalidaClient) && dataSalidaClient.every((item) => "id" in item && "productId" in item)) {
        setDataSalidas(dataSalidaClient as Salida[]);
      } else {
        console.error("Error: dataSalidaClient no tiene el formato esperado", dataSalidaClient);
      }
    }
  };

  const refreshSalidas = async () => {
    if (clientData && clientData.id) {
      const dataSalidaClient = await getSalidas(clientData.id);
      if (Array.isArray(dataSalidaClient) && dataSalidaClient.every((item) => "id" in item && "productId" in item)) {
        setDataSalidas(dataSalidaClient as Salida[]);
        console.log("dataSalidas refreshed to:", dataSalidaClient);
      } else {
        console.error("Error: dataSalidaClient no tiene el formato esperado", dataSalidaClient);
      }
    }
  };

  const handleDelete = async () => {
    setOpenConfirmDelete(false);
    toasterCustom(0, "Eliminando");
    const data = await deleteSalida(itemDeleted?.id);
    if (!data) {
      toasterCustom(500, "Ocurrió un error inesperado");
      return;
    }

    if (data.status === 200) {
      toast.dismiss();
      toasterCustom(data.status, data.message);

      refreshSalidas();
      setItemDeleted(null);
      setItemEditing(null);
      router.refresh();
    } else if (data.status === 400) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
    } else {
      toast.dismiss();
      toasterCustom(data.status, data.message);
    }
  };

  const memoizedData = useMemo(
    () => ({
      productId: itemEditing?.entradaId,
      cantidad: itemEditing?.cantidad,
      precioVenta: (itemEditing?.precioVenta + itemEditing?.descuento) / itemEditing?.cantidad,
      unidadId: itemEditing?.unidadId,
      proveedorId: itemEditing?.proveedorId,
      entradaId: itemEditing?.entradaId, // Añadido
      clientId: clientData?.id || "", // Añadido
      descuento: itemEditing?.descuento, // Añadido si es necesario
      tipoDescuento: itemEditing?.tipoDescuento, // Añadido si es necesario
    }),
    [itemEditing, clientData]
  );

  const handleGenerarVenta = async () => {
    setOpenConfirm(false);
    // Verificar que existan salidas y datos del cliente
    if (dataSalidas.length === 0 || !clientData) {
      toast.error("No hay salidas para confirmar.");
      return;
    }

    setIsLoading(true);

    try {
      // Obtener el ID de SalidaDetalle
      const salidaDetalleResult: SalidaDetalleResult = await getIdSalidaDetalle(clientData.id);

      // Verificar si el resultado es un error
      if (typeof salidaDetalleResult !== "string") {
        // Es un objeto de error
        toasterCustom(salidaDetalleResult.status, salidaDetalleResult.message);
        setIsLoading(false);
        return;
      }

      const salidaDetalleId: string = salidaDetalleResult;

      // Confirmar la venta
      toasterCustom(0, "Confirmando venta...");

      const data = await confirmVenta(salidaDetalleId);
      if (!data) {
        toasterCustom(500, "Ocurrió un error inesperado");
        setIsLoading(false);
        return;
      }

      if (data.status === 200) {
        toast.dismiss();
        toasterCustom(data.status, data.message);
        // Resetear el formulario
        setClientData(null);
        setDataSalidas([]);
        setItemEditing(null);
        setItemDeleted(null);

        router.refresh();
      } else {
        // Manejar otros códigos de estado
        toast.dismiss();
        toasterCustom(data.status, data.message);
      }
    } catch (error) {
      console.error("Error al confirmar la venta:", error);
      toasterCustom(500, "Error al confirmar la venta.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPdf = async (item: Record<string, any>) => {
    if (!item.comprobanteId) {
      toast.error("El comprobante no tiene un ID válido.");
      return;
    }
  
    try {
      // 1. Mostrar el loader
      toasterCustom(0, "Generando PDF...");
  
      // 2. Obtener los detalles del comprobante
      const res = await getDetalleComprobante(item.comprobanteId);
  
      if (res.status !== 200 || !res.data) {
        toasterCustom(res.status, res.message);
        return;
      }
  
      const detalleComprobante = res.data;
  
      // 3. Generar el PDF como Blob utilizando el componente PDF.tsx
      const blob = await pdf(<PDF data={detalleComprobante} />).toBlob();
  
      // 4. Crear una URL para el Blob
      const url = URL.createObjectURL(blob);
  
      // 5. Crear un enlace temporal para descargar el PDF
      const link = document.createElement('a');
      link.href = url;
      link.download = `comprobante-${detalleComprobante.numero}.pdf`; // Puedes personalizar el nombre del archivo
      document.body.appendChild(link);
      link.click();
  
      // 6. Limpiar: remover el enlace y revocar la URL
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // 7. Actualizar el toaster para indicar que la descarga fue exitosa
      toast.dismiss();
      toasterCustom(200, "PDF descargado exitosamente.");
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      toasterCustom(500, "Ocurrió un error al generar el PDF.");
    }
  };
  

  return (
    <>
      <ConfirmDialog
        isOpen={openConfirm}
        onClose={handleCloseConfirm}
        onConfirm={handleGenerarVenta}
        title="¿Estás completamente seguro?"
        description="Esta acción no se puede deshacer."
        styleButton="bg-orange-400"
      />
      <ConfirmDialog
        isOpen={openConfirmDelete}
        onClose={handleCloseConfirmDelete}
        onConfirm={handleDelete}
        title="¿Estás completamente seguro?"
        description="Esta acción no se puede deshacer. Eliminará permanentemente el registro seleccionado."
      />
      <div className="space-y-4">
        <div className="bg-card p-2 rounded-lg">
          <FormSalida
            data={memoizedData}
            idEdit={itemEditing?.id}
            productsOptions={productsOptions}
            clientOptions={clientOptions}
            setItemEditing={setItemEditing}
            handleClientId={handleClientId}
            onCreateSalida={refreshSalidas}
          />
          <div className="space-y-2">
            <div className="space-y-2">
              <h2 className="font-medium">Datos del cliente: </h2>
              <div className="bg-background rounded-lg p-2 text-sm font-medium">
                {clientData && (
                  <div>
                    <p className="space-x-2">
                      <span>{clientData.tipoCliente === "natural" ? "Nombre:" : "Razón social:"}</span>
                      <span className="font-normal">
                        {clientData.tipoCliente === "natural" ? clientData.firstName + " " + clientData.lastName : clientData.companyName}
                      </span>
                    </p>
                    <p className="space-x-2">
                      <span>{clientData.tipoCliente === "natural" ? "DNI/CE:" : "RUC:"}</span>
                      <span className="font-normal">{clientData.tipoCliente === "natural" ? clientData.identifier : clientData.ruc}</span>
                    </p>
                    <p className="space-x-2">
                      <span>Correo electrónico:</span>
                      <span className="font-normal">{clientData.email}</span>
                    </p>
                    <p className="space-x-2">
                      <span>Teléfono:</span>
                      <span className="font-normal">{clientData.phone}</span>
                    </p>
                    <p className="space-x-2">
                      <span>Dirección:</span>
                      <span className="font-normal">{clientData.address}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <h2 className="font-medium">Productos agregados</h2>
            <CustomDataTable
              headers={headersSalida}
              data={dataSalidas}
              initialItemsPerPage={5}
              onDelete={handleOpenConfirmDelete}
              onEdit={handleOpenEdit}
            />
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
              <span>
                {
                  dataSalidas.length === 0
                   ? "No hay productos agregados."
                    : `Total: S/. ${
                      dataSalidas.reduce((acc, curr) => acc + (curr.precioVenta), 0).toFixed(2)
                    }`
                }
              </span>
            <Button disabled={!clientData || dataSalidas.length === 0 || isLoading} onClick={handleOpenConfirm}>
              {isLoading ? "Confirmando..." : "Generar venta"}
            </Button>
            </div>
          </div>
        </div>
        <FormContainer title="Resumen de ventas/salidas">
          <TableVentas onDownload={handleDownloadPdf} headers={headers} data={data} initialItemsPerPage={10} />
        </FormContainer>
      </div>
    </>
  );
}

export default SalidasContainer;
