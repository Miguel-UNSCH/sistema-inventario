"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supplierSchema } from "@/utils/zod/schemas";
import { createProveedor, updateProveedor } from "@/lib/actions";
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import toasterCustom from "../toaster-custom"

interface ChildComponentProps {
    setOpen: (open: boolean) => void;
    data: z.infer<typeof supplierSchema>
    idEdit?: string
}

export function FormSupplier({ setOpen, data, idEdit }: ChildComponentProps) {
    const router = useRouter();

    const form = useForm<z.infer<typeof supplierSchema>>({
        resolver: zodResolver(supplierSchema),
        defaultValues: data ? {
            supplierName: data.supplierName,
            ruc: data.ruc,
            email: data.email,
            phone: data.phone,
            address: data.address,
        } : {}
    });

    async function onSubmitUpdate(id: string, values: z.infer<typeof supplierSchema>) {
        console.log(values);
        toasterCustom(0);
        const data = await updateProveedor(id, values);

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
            form.setError("supplierName", { type: "error", message: data.message });
            form.setFocus("supplierName");
        }
    }

    async function onSubmitCreate(values: z.infer<typeof supplierSchema>) {
        toasterCustom(0);
        console.log(values)
        const data = await createProveedor(values);
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
            form.setError("supplierName", { type: "error", message: data.message });
            form.setFocus("supplierName");
        }
    }

    async function onSubmit(values: z.infer<typeof supplierSchema>) {
        if (idEdit) {
            await onSubmitUpdate(idEdit, values);
        } else {
            await onSubmitCreate(values);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="supplierName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del Proveedor:</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre del proveedor" {...field} />
                            </FormControl>
                            <FormMessage className="text-end" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ruc"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>RUC:</FormLabel>
                            <FormControl>
                                <Input placeholder="20103652901" {...field} />
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
                            <FormLabel>Correo Electrónico:</FormLabel>
                            <FormControl>
                                <Input placeholder="empresa@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage className="text-end" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Teléfono:</FormLabel>
                            <FormControl>
                                <Input placeholder="Teléfono del proveedor" {...field} />
                            </FormControl>
                            <FormMessage className="text-end" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dirección:</FormLabel>
                            <FormControl>
                                <Input placeholder="Dirección del proveedor" {...field} />
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
