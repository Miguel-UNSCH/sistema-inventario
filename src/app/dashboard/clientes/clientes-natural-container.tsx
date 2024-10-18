/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DialogForm } from "@/components/dialog/dialog-form";
import { FormClientePersonaNatural } from "@/components/forms/form-persona-natural";
import CustomDataTable from "@/components/table/custom-data-table";
import { useState } from "react";

interface ClientesContainerProps {
  data: Record<string, any>[];
  headers: { key: string; label: string }[];
}

function ClientesNaturalContainer({ data, headers }: ClientesContainerProps) {

  const [open, setOpen] = useState(false);
  const [itemEditing, setItemEditing] = useState<Record<string, any> | null>(null);

  console.log(itemEditing);

  return (
    <>
      <div className="flex justify-between gap-4">
        <DialogForm setItemEditing={setItemEditing} open={open} setOpen={setOpen} textButton="Agregar persona natural" titleDialog="Cliente nuevo (Persona natural)" descriptionDialog="Agrega un cliente nuevo">
          <FormClientePersonaNatural />
        </DialogForm>
      </div>
      <CustomDataTable headers={headers} data={data} initialItemsPerPage={5} />
    </>
  );
}

export default ClientesNaturalContainer;
