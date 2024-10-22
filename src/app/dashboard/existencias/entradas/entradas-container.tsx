'use client'

import { FormEntrada } from "@/components/forms/form-entradas";

function EntradasContainer() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 w-full">
        <div className="bg-card p-2 rounded-lg">
          <FormEntrada data={{
            productId: "string",
            cantidad: 1,
            precioCompra: 1.5,
            precioVenta: 2,
            unidadId: "s",
          }} idEdit="assddddddd" />
        </div>
        <div className="bg-card p-2 rounded-lg flex-1">
          Lista de entradas agregadas
        </div>
      </div>
      <div className="bg-card p-2 rounded-lg">
        Tabla con todas las entradas
      </div>
    </div>
  )
}

export default EntradasContainer;
