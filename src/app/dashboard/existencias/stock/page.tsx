import { CustomBarChart } from "@/components/charts/bar-chart";
import { Combobox } from "@/components/select/combobox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCategoriesWithoutPermissions } from "@/actions/category-actions";

async function Page() {
  const categorias = await getCategoriesWithoutPermissions()
  const validCategories = Array.isArray(categorias) ? categorias : [];

  const categoriasProductos = validCategories.map((categoria) => {
    return {
      value: categoria.id,
      label: categoria.category,
    }
  })
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-[250px]">
          <Combobox
            options={categoriasProductos}
            placeholder="Selecciona la categoría"
          />
        </div>
        <Button variant="outline" className="text-white bg-primary dark:bg-primary">
          <Link href="/dashboard/productos/categorias">Agregar una categoría</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 rounded-lg shadow-lg gap-6">
        <CustomBarChart />
      </div>
    </div>
  );
}

export default Page;
