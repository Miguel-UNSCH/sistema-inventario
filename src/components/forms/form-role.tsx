"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { roleSchema } from "@/utils/zod/schemas"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import toasterCustom from "../toaster-custom"
import { createRole, updateRole } from "@/actions/role-actions"

interface ChildComponentProps {
  setOpen: (open: boolean) => void;
  data: z.infer<typeof roleSchema>
  idEdit?: string
}

export function FormRole({ setOpen, data, idEdit }: ChildComponentProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: data ? { role: data.role, description: data.description } : {}
  });

  async function onSubmitUpdate(id: string, values: z.infer<typeof roleSchema>) {
    console.log(values);
    toasterCustom(0);
    const data = await updateRole(id, values);

    if (!data) {
      toasterCustom(500, "Ocurrió un error inesperado");
      return;
    }

    if (data.status === 200) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
      router.refresh(); // actualizar la tabla

      setOpen(false);
    } else if (data.status === 400) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
      form.setError("role", { type: "error", message: data.message });
      form.setFocus("role");
    } else {
      toast.dismiss();
      toasterCustom(data.status, data.message);

      setOpen(false);
    }
  }

  async function onSubmitCreate(values: z.infer<typeof roleSchema>) {
    toasterCustom(0);
    const data = await createRole(values);

    if (!data) {
      toasterCustom(500, "Ocurrió un error inesperado");
      return;
    }

    if (data.status === 200) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
      router.refresh(); // actualizar la tabla

      setOpen(false);
    } else if (data.status === 400) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
      form.setError("role", { type: "error", message: data.message });
      form.setFocus("role");
    } else {
      toast.dismiss();
      toasterCustom(data.status, data.message);

      setOpen(false);
    }
  }

  async function onSubmit(values: z.infer<typeof roleSchema>) {
    if (idEdit) {
      await onSubmitUpdate(idEdit, values);
    } else {
      await onSubmitCreate(values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de rol:</FormLabel>
              <FormControl>
                <Input placeholder="trabajador ..." {...field} />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción:</FormLabel>
              <FormControl>
                <Input placeholder="acceso a modulos ..." {...field} />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <div className="flex justify-center py-3">
          <Button type="submit">
            {idEdit ? "Actualizar" : "Guardar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
