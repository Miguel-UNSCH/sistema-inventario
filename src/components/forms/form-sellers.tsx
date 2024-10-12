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

export function FormSupplier() {
    const form = useForm<z.infer<typeof supplierSchema>>({
        resolver: zodResolver(supplierSchema),
    });
    function onSubmit(values: z.infer<typeof supplierSchema>) {
        console.log(values);
    }


    return (
        <Form {...form}>
            <div className="max-h-[500px] space-y-4 p-4 rounded-md">
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
                        <Button type="submit">Guardar</Button>
                    </div>
                </form>
            </div>
        </Form>
    );
}
