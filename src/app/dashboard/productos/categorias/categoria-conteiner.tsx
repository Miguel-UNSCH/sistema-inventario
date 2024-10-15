/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { DialogForm } from "@/components/dialog/dialog-form";
import { FormCategory } from "@/components/forms/form-category";
import CustomDataTable from "@/components/table/custom-data-table";
import toasterCustom from "@/components/toaster-custom";
import { deleteCategoria} from "@/lib/actions";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation"

interface CategoriaContainerProps {
    data: Record<string, any>[];
    headers: { key: string; label: string }[];
}

function CategoriaContainer({ data, headers }: CategoriaContainerProps) {

    const router = useRouter()

    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    const [itemDeleted, setItemDeleted] = useState<Record<string, any> | null>(null);
    const [itemEditing, setItemEditing] = useState<Record<string, any> | null>(null);

    const handleOpenConfirm = (item: Record<string, any>) => {
        setItemDeleted(item);
        setOpenConfirm(true);
    }

    const handleOpenEdit = (item: Record<string, any>) => {
        setItemEditing(item);
        setOpen(true);
    }

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    }

    const handleDelete = async () => {
        setOpenConfirm(false);
        toasterCustom(0, "Eliminando")
        const data = await deleteCategoria(itemDeleted?.id);
        if (!data) {
            toasterCustom(500, "Ocurrió un error inesperado")
            return;
        }

        if (data.status === 200) {
            toast.dismiss();
            toasterCustom(data.status, data.message)
            router.refresh();

            setOpen(false)

        } else if (data.status === 400) {
            toast.dismiss();
            toasterCustom(data.status, data.message)
        }
    }

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
                <DialogForm setItemEditing={setItemEditing} open={open} setOpen={setOpen} textButton="Agregar nuevo categoria" titleDialog="REGISTRO DE CATEGORIA" descriptionDialog="Agrega una nueva categoria">
                    <FormCategory
                        setOpen={setOpen}
                        data={{
                            category: itemEditing?.category,
                            description: itemEditing?.description,
                        }}
                        idEdit={itemEditing?.id}
                    />
                </DialogForm>
            </div>
            <CustomDataTable headers={headers} data={data} initialItemsPerPage={5} onDelete={handleOpenConfirm} onEdit={handleOpenEdit} />
        </>
    )
}

export default CategoriaContainer;
