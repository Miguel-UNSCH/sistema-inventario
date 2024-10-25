/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { deleteEntrada } from "@/actions/entrada-actions";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { FormEntrada } from "@/components/forms/form-entradas";
import CustomDataTable from "@/components/table/custom-data-table";
import toasterCustom from "@/components/toaster-custom";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface EntradasContainerProps {
  data: Record<string, any>[];
  headers: { key: string; label: string }[];
  unidadesMedida: Record<string, any>[];
  products: Record<string, any>[];
  suppliers: Record<string, any>[];
}

function EntradasContainer({ data, headers, unidadesMedida, products, suppliers }: EntradasContainerProps) {
  const unidadesOptions = unidadesMedida.map((unidad) => {
    return { value: String(unidad.id), label: String(`${unidad.nombre} (${unidad.simbolo})`) };
  });

  const productsOptions = products.map((product) => {
    return { value: String(product.id), label: String(product.productName) };
  });

  const supplierOptions = suppliers.map((supplier) => {
    return { value: String(supplier.id), label: String(supplier.supplierName) };
  });

  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState(false);

  const [itemDeleted, setItemDeleted] = useState<Record<string, any> | null>(null);
  const [itemEditing, setItemEditing] = useState<Record<string, any> | null>(null);

  const handleOpenConfirm = (item: Record<string, any>) => {
    setItemDeleted(item);
    setOpenConfirm(true);
  };

  const handleOpenEdit = (item: Record<string, any>) => {
    setItemEditing(item);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDelete = async () => {
    setOpenConfirm(false);
    toasterCustom(0, "Eliminando");
    const data = await deleteEntrada(itemDeleted?.id);
    if (!data) {
      toasterCustom(500, "Ocurrió un error inesperado");
      return;
    }

    if (data.status === 200) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
      router.refresh();
    } else if (data.status === 400) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
    } else {
      toast.dismiss();
      toasterCustom(data.status, data.message);
    }
  };

  return (
    <>
      <ConfirmDialog
        isOpen={openConfirm}
        onClose={handleCloseConfirm}
        onConfirm={handleDelete}
        title="¿Estás completamente seguro?"
        description="Esta acción no se puede deshacer. Eliminará permanentemente el registro seleccionado."
      />
      <div className="space-y-4">
        <div className="bg-card p-2 rounded-lg">
          <FormEntrada
            data={{
              productId: itemEditing?.productId,
              cantidad: itemEditing?.cantidad,
              precioCompra: itemEditing?.precioCompra,
              precioVenta: itemEditing?.precioVenta,
              unidadId: itemEditing?.unidadId,
              proveedorId: itemEditing?.proveedorId,
            }}
            idEdit={itemEditing?.id}
            productsOptions={productsOptions}
            unidadesOptions={unidadesOptions}
            supplierOptions={supplierOptions}
            setItemEditing={setItemEditing}
          />
        </div>
        <div className="bg-card py-4 px-2 rounded-lg">
          <CustomDataTable headers={headers} data={data} initialItemsPerPage={5} onDelete={handleOpenConfirm} onEdit={handleOpenEdit} />
        </div>
      </div>
    </>
  );
}

export default EntradasContainer;
