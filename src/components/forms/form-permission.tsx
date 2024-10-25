"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { permissionSchema } from "@/utils/zod/schemas";
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import toasterCustom from "../toaster-custom"
import { SelectFilter } from "../select/select-filter";
import { Combobox } from "../select/combobox";
import { createPermission, updatePermission } from "@/lib/actions";

interface ChildComponentProps {
  setOpen: (open: boolean) => void;
  data: z.infer<typeof permissionSchema>;
  idEdit?: string;
  roleOptions: Array<{ value: string; label: string }>
}

export function FormPermission({ setOpen, data, idEdit, roleOptions }: ChildComponentProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof permissionSchema>>({
    resolver: zodResolver(permissionSchema),
    defaultValues: data ? { roleId: data.roleId, module: data.module, action: data.action } : {}
  });

  async function onSubmitUpdate(id: string, values: z.infer<typeof permissionSchema>) {
    console.log(values);
    toasterCustom(0);
    const data = await updatePermission(id, values);

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
      form.setError("roleId", { type: "error", message: data.message });
      form.setFocus("roleId");
    }
  }

  async function onSubmitCreate(values: z.infer<typeof permissionSchema>) {
    toasterCustom(0);
    const data = await createPermission(values);

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
      form.setError("roleId", { type: "error", message: data.message });
      form.setFocus("roleId");
    }
  }

  async function onSubmit(values: z.infer<typeof permissionSchema>) {
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
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol:</FormLabel>
              <FormControl>
                <Combobox
                  placeholder="rol"
                  options={roleOptions}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="module"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Módulo:</FormLabel>
              <FormControl>
                <Combobox
                  placeholder="módulo"
                  options={[
                    { value: "clientes", label: "Clientes" },
                    { value: "categorias", label: "Productos Categorias" },
                    { value: "productos", label: "Productos" },
                    { value: "proveedores", label: "Proveedores" },
                    { value: "entradas", label: "Existencias Entradas" },
                    { value: "salidas", label: "Existencias Salidas" },
                    { value: "usuarios", label: "Gestión de Usuarios" },
                    { value: "roles", label: "Gestión de Roles" },
                  ]}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Acciones:</FormLabel>
              <FormControl>
                <SelectFilter
                  placeholder="seleccione"
                  options={[
                    { value: "leer", label: "Leer" },
                    { value: "crear", label: "Crear" },
                    { value: "eliminar", label: "Eliminar" },
                    { value: "actualizar", label: "Actualizar" },
                  ]}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <div className="flex justify-center py-3">
          <Button type="submit">{idEdit ? "Actualizar" : "Guardar"}</Button>
        </div>
      </form>
    </Form>
  );
}
