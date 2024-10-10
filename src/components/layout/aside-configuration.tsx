'use client'

import Link from "next/link";
import { HiOutlineUser } from "react-icons/hi2";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { TiDocumentText } from "react-icons/ti";
import { usePathname } from "next/navigation";
import clsx from "clsx";

function AsideConfiguration({ path }: { path: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-fit h-fit">
      <ul className="p-4 w-full flex flex-col gap-4">
        <li className="w-full">
          <Link
            href={`${path}/configuracion/profile`}
            className={clsx(
              "p-4 w-full flex rounded-lg items-center gap-3 pr-10 transition-colors group",
              {
                "": pathname !== `${path}/configuracion/profile`,
                "bg-[#F7FAFC] dark:bg-[#23262B]": pathname === `${path}/configuracion/profile`
              },
              "hover:bg-[#F7FAFC] dark:hover:bg-[#23262B]"
            )}
          >
            <div
              className={clsx(
                "p-3 rounded-full transition-colors",
                {
                  "": pathname !== `${path}/configuracion/profile`,
                  "bg-primary text-white": pathname === `${path}/configuracion/profile`
                },
                "group-hover:bg-primary group-hover:text-white"
              )}
            >
              <HiOutlineUser className="text-2xl" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Administrar cuenta</span>
              <span className="text-gray-500 dark:text-gray-400">Gestionar datos de la cuenta</span>
            </div>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href={`${path}/configuracion/notificaciones`}
            className={clsx(
              "p-4 w-full flex rounded-lg items-center gap-3 pr-10 transition-colors group",
              {
                "": pathname !== `${path}/configuracion/notificaciones`,
                "bg-[#F7FAFC] dark:bg-[#23262B]": pathname === `${path}/configuracion/notificaciones`
              },
              "hover:bg-[#F7FAFC] dark:hover:bg-[#23262B]"
            )}
          >
            <div
              className={clsx(
                "p-3 rounded-full transition-colors",
                {
                  "": pathname !== `${path}/configuracion/notificaciones`,
                  "bg-primary text-white": pathname === `${path}/configuracion/notificaciones`
                },
                "group-hover:bg-primary group-hover:text-white"
              )}
            >
              <IoNotificationsOutline className="text-2xl" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Notificaciones</span>
              <span className="text-gray-500 dark:text-gray-400">Configuración de notificaciones</span>
            </div>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href={`${path}/configuracion/faq`}
            className={clsx(
              "p-4 w-full flex rounded-lg items-center gap-3 pr-10 transition-colors group",
              {
                "": pathname !== `${path}/configuracion/faq`,
                "bg-[#F7FAFC] dark:bg-[#23262B]": pathname === `${path}/configuracion/faq`
              },
              "hover:bg-[#F7FAFC] dark:hover:bg-[#23262B]"
            )}
          >
            <div
              className={clsx(
                "p-3 rounded-full transition-colors",
                {
                  "": pathname !== `${path}/configuracion/faq`,
                  "bg-primary text-white": pathname === `${path}/configuracion/faq`
                },
                "group-hover:bg-primary group-hover:text-white"
              )}
            >
              <FaRegCircleQuestion className="text-2xl" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Preguntas frecuentes</span>
              <span className="text-gray-500 dark:text-gray-400">Preguntas frecuentes</span>
            </div>
          </Link>
        </li>
        <li className="w-full">
          <Link
            href={`${path}/configuracion/terms`}
            className={clsx(
              "p-4 w-full flex rounded-lg items-center gap-3 pr-10 transition-colors group",
              {
                "": pathname !== `${path}/configuracion/terms`,
                "bg-[#F7FAFC] dark:bg-[#23262B]": pathname === `${path}/configuracion/terms`
              },
              "hover:bg-[#F7FAFC] dark:hover:bg-[#23262B]"
            )}
          >
            <div
              className={clsx(
                "p-3 rounded-full transition-colors",
                {
                  "": pathname !== `${path}/configuracion/terms`,
                  "bg-primary text-white": pathname === `${path}/configuracion/terms`
                },
                "group-hover:bg-primary group-hover:text-white"
              )}
            >
              <TiDocumentText className="text-2xl" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Términos y condiciones</span>
              <span className="text-gray-500 dark:text-gray-400">Términos y condiciones</span>
            </div>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default AsideConfiguration;
