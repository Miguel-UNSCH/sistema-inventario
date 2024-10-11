"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "productsSupplied", // Este nombre debe coincidir con el del schema
    });

    function onSubmit(values: z.infer<typeof supplierSchema>) {
        console.log(values);
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
                                <Input placeholder="RUC del proveedor" {...field} />
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
                                <Input placeholder="Correo electrónico" {...field} />
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
                <div>
                    <FormLabel>Productos Suministrados:</FormLabel>
                    {fields.map((field, index) => (
                        <div key={field.id} className="space-y-2">
                            <FormField
                                control={form.control}
                                name={`productsSupplied.${index}.productName`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre del Producto:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nombre del producto" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-end" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`productsSupplied.${index}.productCode`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Código del Producto:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Código del producto" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-end" />
                                    </FormItem>
                                )}
                            />
                            <Button type="button" onClick={() => remove(index)}>
                                Eliminar Producto
                            </Button>
                        </div>
                    ))}
                    <Button className="" type="button" onClick={() => append({ productName: "", productCode: "" })}>
                        Añadir Producto
                    </Button>
                </div>

                <div className="flex justify-center py-3">
                    <Button type="submit">Guardar</Button>
                </div>
            </form>
        </Form>
    );
}
