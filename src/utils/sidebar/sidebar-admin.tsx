
import { GoHomeFill } from "react-icons/go";
import { HiDocumentChartBar } from "react-icons/hi2";
import { FaUserCog, FaUserPlus, FaUsersCog } from "react-icons/fa";
import { SidebarMenu } from "@/types/opciones_menu";
import { RiUserVoiceFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";

export const SIDEBAR_ADMIN_MENU: SidebarMenu = {
  title: 'Menu',
  options: [
    {
      label: 'Inicio',
      href: '/admin/dashboard',
      icon: <GoHomeFill className="h-5 w-5"/>,
    },
    {
      label: 'Reportes',
      href: '/admin/dashboard/reportes',
      icon: <HiDocumentChartBar className="h-5 w-5"/>,
    },
    {
      label: 'Trabajadores',
      icon: <FaUsersCog className="h-5 w-5"/>,
      children: [
        {
          label: 'Gestionar',
          href: '/admin/dashboard/trabajadores/gestionar',
          icon: <FaUserCog className="h-5 w-5"/>,
        },
        {
          label: 'Agregar',
          href: '/admin/dashboard/trabajadores/agregar',
          icon: <FaUserPlus className="h-5 w-5"/>,
        },
      ]
    }
  ]
}

export const SIDEBAR_ADMIN_HELP: SidebarMenu = {
  title: 'Ayuda',
  options: [
    {
      label: 'Apoyo',
      href: '/admin/dashboard/apoyo',
      icon: <RiUserVoiceFill className="h-5 w-5"/>,
    },
    {
      label: 'Configuración',
      href: '/admin/dashboard/configuracion',
      icon: <IoSettings className="h-5 w-5"/>,
    },
  ]
}