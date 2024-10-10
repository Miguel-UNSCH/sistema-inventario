import { Ellipsis, Plus } from "lucide-react";

/* eslint-disable @next/next/no-img-element */
function AccountForm() {
  return (
    <div className="flex flex-col w-full gap-4">
      <h2 className="text-xl font-bold">Cuenta</h2>
      <div className="w-full h-[1px] bg-border"></div>
      <div className="flex flex-col lg:flex-row gap-5 items-center">
        <span className="font-medium w-full lg:w-1/4 text-start">Perfil</span>
        <div className="w-full flex flex-wrap justify-between items-center gap-3">
          <img src="/logo/logo.png" alt="photo" className="w-16 rounded-full" />
          <button className="border border-primary py-2 px-5 rounded-xl text-primary hover:border-green-600 hover:text-green-600 transition-all duration-150">
            Actualizar perfil
          </button>
        </div>
      </div>
      <div className="w-full h-[1px] bg-border"></div>
      <div className="flex flex-col lg:flex-row gap-5 items-center">
        <span className="font-medium w-full lg:w-1/4 text-start">Nombre de usuario</span>
        <div className="w-full flex flex-wrap justify-between items-center gap-3">
          <span className="w-full lg:w-1/4 text-start">kenedpalo</span>
          <button className="border border-primary py-2 px-5 rounded-xl text-primary hover:border-green-600 hover:text-green-600 transition-all duration-150">
            Cambiar nombre de usuario
          </button>
        </div>
      </div>
      <div className="w-full h-[1px] bg-border"></div>
      <div className="flex flex-col lg:flex-row gap-5 items-center">
        <span className="font-medium w-full lg:w-1/4 text-start">Correos electrónicos</span>
        <div className="w-full flex flex-wrap justify-between items-center gap-3">
          <div className="flex flex-col gap-4">
            <div className="w-full lg:w-1/4 text-start flex gap-2">
              <span>correo@correo.com</span>
              <span className="bg-bgColor">primario</span>
            </div>
            <button className="border border-primary py-2 px-5 rounded-xl text-primary hover:border-green-600 hover:text-green-600 transition-all duration-150 flex gap-3">
              <Plus className="w-5" />
              Agregar correo
            </button>
          </div>
          <button>
            <Ellipsis />
          </button>
        </div>
      </div>
      <div className="w-full h-[1px] bg-border"></div>
      <div className="flex flex-col lg:flex-row gap-5 items-center">
        <span className="font-medium w-full lg:w-1/4 text-start">Cuentas conectadas</span>
        <div className="w-full flex flex-wrap justify-between items-center gap-3">
          <button className="border border-primary py-2 px-5 rounded-xl text-primary hover:border-green-600 hover:text-green-600 transition-all duration-150 flex gap-3">
            <Plus className="w-5" />
            Conectar cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountForm;
