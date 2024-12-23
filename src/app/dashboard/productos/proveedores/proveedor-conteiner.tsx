/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { DialogForm } from "@/components/dialog/dialog-form";
import { FormSupplier } from "@/components/forms/form-sellers";
import CustomDataTable from "@/components/table/custom-data-table";
import toasterCustom from "@/components/toaster-custom";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteSupplier } from "@/actions/supplier-actions";

interface ProveedorContainerProps {
  data: Record<string, any>[];
  headers: { key: string; label: string }[];
}

function ProveedorContainer({ data, headers }: ProveedorContainerProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [itemDeleted, setItemDeleted] = useState<Record<string, any> | null>(null);
  const [itemEditing, setItemEditing] = useState<Record<string, any> | null>(null);

  const handleOpenConfirm = (item: Record<string, any>) => {
    setItemDeleted(item);
    setOpenConfirm(true);
  };

  const handleOpenEdit = (item: Record<string, any>) => {
    setItemEditing(item);
    setOpen(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDelete = async () => {
    setOpenConfirm(false);
    toasterCustom(0, "Eliminando");
    const data = await deleteSupplier(itemDeleted?.id);
    if (!data) {
      toasterCustom(500, "Ocurrió un error inesperado");
      return;
    }

    if (data.status === 200) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
      router.refresh();

      setOpen(false);
    } else if (data.status === 400) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
    } else {
      toast.dismiss();
      toasterCustom(data.status, data.message);

      setOpen(false);
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
      <div className="flex justify-between gap-4">
        <DialogForm
          setItemEditing={setItemEditing}
          open={open}
          setOpen={setOpen}
          textButton="Agregar nuevo proveedor"
          titleDialog="REGISTRO DE PROVEEDOR"
          descriptionDialog="Agrega un nuevo proveedor">
          <FormSupplier
            setOpen={setOpen}
            data={{
              supplierName: itemEditing?.supplierName,
              ruc: itemEditing?.ruc,
              email: itemEditing?.email,
              phone: itemEditing?.phone,
              address: itemEditing?.address,
            }}
            idEdit={itemEditing?.id}
          />
        </DialogForm>
      </div>
      <CustomDataTable headers={headers} data={data} initialItemsPerPage={5} onDelete={handleOpenConfirm} onEdit={handleOpenEdit} />
    </>
  );
}

export default ProveedorContainer;
