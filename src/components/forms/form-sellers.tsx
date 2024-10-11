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
import { Trash2 } from "lucide-react";

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
            {/* Contenedor con un tamaño máximo y barra de desplazamiento */}
            <div className="max-h-[500px] overflow-y-auto space-y-4 p-4 border rounded-md">
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


                    <div className="space-y-4">
    <div className="flex flex-col space-y-4">
        {/* Campos de producto */}
        <div className="flex flex-row space-x-4">
            <div>
                <FormField
                    control={form.control}
                    name="productName"
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
            </div>
            <div>
                <FormField
                    control={form.control}
                    name="productCode"
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
            </div>
        </div>
        <div>
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ productName: "", productCode: "" })}
            >
                Añadir Producto
            </Button>
        </div>
    </div>

    {/* Lista de productos añadidos */}
    <div className="space-y-2">
        {fields.map((field, index) => (
            <div key={field.id} className="flex items-center justify-between space-x-4">
                <div>
                    <p>
                        <strong>Producto:</strong> {field.productName || "Sin nombre"} |{" "}
                        <strong>Código:</strong> {field.productCode || "Sin código"}
                    </p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => remove(index)}
                    className="flex items-center space-x-2"
                >
                    <Trash2 className="w-4 h-4" />
                    <span>Eliminar</span>
                </Button>
            </div>
        ))}
    </div>
</div>


                    <div className="flex justify-center py-3">
                        <Button type="submit">Guardar</Button>
                    </div>
                </form>
            </div>
        </Form>
    );
}
