"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { userSchema } from "@/utils/zod/schemas";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import toasterCustom from "../toaster-custom";
import { Combobox } from "../select/combobox";
import { createUser, updateUser } from "@/lib/actions";
import { Input } from "../ui/input";

interface ChildComponentProps {
  setOpen: (open: boolean) => void;
  data: z.infer<typeof userSchema>;
  idEdit?: string;
  roleOptions: Array<{ value: string; label: string }>;
}

export function FormUser({ setOpen, data, idEdit, roleOptions }: ChildComponentProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: data && idEdit ? { name: data.name, email: data.email, user: data.user, roleId: data.roleId, password: data.password } : {},
  });

  async function onSubmitUpdate(id: string, values: z.infer<typeof userSchema>) {
    toasterCustom(0);

    console.log(id, values);

    const data = await updateUser(id, values);

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
      form.setError(data.type, { type: "error", message: data.message });
      form.setFocus(data.type);
    }
  }

  async function onSubmitCreate(values: z.infer<typeof userSchema>) {
    toasterCustom(0);
    const data = await createUser(values);

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
      form.setError(data.type, { type: "error", message: data.message });
      form.setFocus(data.type);
    }
  }

  async function onSubmit(values: z.infer<typeof userSchema>) {
    console.log(values);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre:</FormLabel>
              <FormControl>
                <Input placeholder="Juan Perez Perez" {...field} />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo:</FormLabel>
              <FormControl>
                <Input type="email" placeholder="juan@juan.com" {...field} />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario:</FormLabel>
              <FormControl>
                <Input placeholder="Juan123" {...field} />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña:</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  {...field}
                  disabled={idEdit ? true : false}
                />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol:</FormLabel>
              <FormControl>
                <Combobox placeholder="rol" options={roleOptions} {...field} />
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
