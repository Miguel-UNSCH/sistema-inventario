/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from "react";
import { Session } from "next-auth";
import FormContainer from "@/components/forms/form-container";
import { getCategoriesWithoutPermissions } from "@/actions/category-actions";
import { getProductWithoutPermissions } from "@/actions/product-actions";
import { getSupplierWithoutPermissions } from "@/actions/supplier-actions";
import { CardBlocks } from "@/components/blocks/card";
import { CustomAreaChart } from "./pieChart-conteiner";
import { getSalidasWithoutpermissions } from "@/actions/salida-actions";

function Page({ session }: { session: Session | null }) {
  const [categorias, setCategorias] = useState<Array<any> | null>(null);
  const [productos, setProductos] = useState<Array<any> | null>(null);
  const [proveedores, setProveedores] = useState<Array<any> | null>(null);
  const [salidas, setSalidas] = useState<Array<{ productName: string; cantidad: number }> | null>(null);

  useEffect(() => {
    async function fetchData() {
      const categorias = await getCategoriesWithoutPermissions();
      const productos = await getProductWithoutPermissions();
      const proveedores = await getSupplierWithoutPermissions();
      const salidas = await getSalidasWithoutpermissions();

      const validCategories = Array.isArray(categorias) ? categorias : [];
      const validProductos = Array.isArray(productos) ? productos : [];
      const validproveedores = Array.isArray(proveedores) ? proveedores : [];
      const validSalidas = Array.isArray(salidas) ? salidas : [];

      setCategorias(validCategories);
      setProductos(validProductos);
      setProveedores(validproveedores);
      setSalidas(validSalidas);
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            ¡Hola {session?.user?.name}, Buen Día!
          </h1>
          <p className="text-base md:text-lg text-card-foreground">
            A continuación, presento los informes actualizados correspondientes al día de hoy.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          <CardBlocks title="Categorias" description="Total de categorias disponibles" cantidad={categorias ? categorias.length : 0} />
          <CardBlocks title="Productos" description="Total de productos disponibles" cantidad={productos ? productos.length : 0} />
          <CardBlocks title="Proveedores" description="Total de proveedores disponibles" cantidad={proveedores ? proveedores.length : 0} />
        </div>
      </div>

      <div className="text-foreground h-full">
        <FormContainer title="Productos más vendidos">
          <CustomAreaChart salidas={salidas || []} />
        </FormContainer>
      </div>
    </div>
  );
}

export default Page;
