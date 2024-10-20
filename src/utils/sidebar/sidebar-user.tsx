
import { GoHomeFill } from "react-icons/go";
import { HiDocumentChartBar } from "react-icons/hi2";
import { FaCartPlus, FaShoppingCart, FaUserCog, FaUsers, FaUserShield } from "react-icons/fa";
import { RiUserVoiceFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { AiOutlineStock } from "react-icons/ai";

import { SidebarMenu } from "@/types/opciones_menu";
import { FaBuildingUser, FaListCheck, FaTruckArrowRight, FaUsersGear } from "react-icons/fa6";

export const SIDEBAR_USER_MENU: SidebarMenu = {
  title: 'Menu',
  options: [
    {
      label: 'Inicio',
      href: '/dashboard',
      icon: <GoHomeFill className="h-5 w-5"/>,
    },
    {
      label: 'Clientes',
      href: '/dashboard/clientes',
      icon: <FaUsers className="h-5 w-5"/>,
    },
    {
      label: 'Reportes',
      href: '/dashboard/reportes',
      icon: <HiDocumentChartBar className="h-5 w-5"/>,
    },
    {
      label: 'Gestión de productos',
      icon: <FaShoppingCart className="h-5 w-5"/>,
      children: [
        {
          label: 'Categorias',
          href: '/dashboard/productos/categorias',
          icon: <BiSolidCategoryAlt className="h-5 w-5"/>,
        },
        {
          label: 'Productos',
          href: '/dashboard/productos/productos',
          icon: <FaCartPlus className="h-5 w-5"/>,
        },
        {
          label: 'Proveedores',
          href: '/dashboard/productos/proveedores',
          icon: <FaBuildingUser className="h-5 w-5"/>,
        },
      ]
    },
    {
      label: 'Gestión de existencias',
      icon: <FaListCheck className="h-5 w-5"/>,
      children: [
        {
          label: 'Entradas',
          href: '/dashboard/existencias/entradas',
          icon: <FaTruckArrowRight className="h-5 w-5"/>,
        },
        {
          label: 'Salidas / Facturación',
          href: '/dashboard/existencias/salidas',
          icon: <FaTruckArrowRight className="h-5 w-5" style={{ transform: 'rotateY(180deg)' }}/>,
        },
        {
          label: 'Stock actual',
          href: '/dashboard/existencias/stock',
          icon: <AiOutlineStock className="h-5 w-5"/>,
        }
      ]
    },
    {
      label: 'Gestión de usuarios',
      icon: <FaUsersGear className="h-5 w-5"/>,
      children: [
        {
          label: 'Usuarios',
          href: '/dashboard/usuarios/usuarios',
          icon: <FaUserCog className="h-5 w-5"/>,
        },
        {
          label: 'Roles',
          href: '/dashboard/usuarios/roles',
          icon: <FaUserShield className="h-5 w-5"/>,
        },
      ]
    },
  ]
}

export const SIDEBAR_USER_HELP: SidebarMenu = {
  title: 'Configuraciones',
  options: [
    {
      label: 'Cuenta',
      href: '/dashboard/cuenta',
      icon: <RiUserVoiceFill className="h-5 w-5"/>,
    },
    {
      label: 'Configuración general',
      href: '/dashboard/configuracion',
      icon: <IoSettings className="h-5 w-5"/>,
    },
  ]
}