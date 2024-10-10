
import { GoHomeFill } from "react-icons/go";
import { HiClipboardDocumentList, HiDocumentChartBar } from "react-icons/hi2";
import { FaBook, FaUserCog, FaUserGraduate } from "react-icons/fa";
import { RiUserVoiceFill } from "react-icons/ri";
import { IoDocumentText, IoSettings } from "react-icons/io5";
import { GiDiploma, GiReceiveMoney } from "react-icons/gi";
import { PiPathBold } from "react-icons/pi";
import { GrMoney } from "react-icons/gr";
import { TbDisabled } from "react-icons/tb";
import { Receipt } from "lucide-react";
import { SidebarMenu } from "@/types/opciones_menu";

export const SIDEBAR_USER_MENU: SidebarMenu = {
  title: 'Menu',
  options: [
    {
      label: 'Inicio',
      href: '/dashboard',
      icon: <GoHomeFill className="h-5 w-5"/>,
    },
    {
      label: 'Reportes',
      href: '/dashboard/reportes',
      icon: <HiDocumentChartBar className="h-5 w-5"/>,
    },
    {
      label: 'Legajo',
      icon: <IoDocumentText className="h-5 w-5"/>,
      children: [
        {
          label: 'Datos personales',
          href: '/dashboard/legajo/datos',
          icon: <FaUserCog className="h-5 w-5"/>,
        },
        {
          label: 'Estudios y capacitación',
          href: '/dashboard/legajo/estudios',
          icon: <FaUserGraduate className="h-5 w-5"/>,
        },
        {
          label: 'Bonificaciones personales',
          href: '/dashboard/legajo/bonificacionesP',
          icon: <GiReceiveMoney className="h-5 w-5"/>,
        },
        {
          label: 'Bonificaciones familiares',
          href: '/dashboard/legajo/bonificacionesF',
          icon: <GrMoney className="h-5 w-5"/>,
        },
        {
          label: 'Experiencia laboral',
          href: '/dashboard/legajo/experiencia',
          icon: <PiPathBold className="h-5 w-5"/>,
        },
        {
          label: 'Ficha de evaluación',
          href: '/dashboard/legajo/ficha-evaluacion',
          icon: <HiClipboardDocumentList className="h-5 w-5"/>,
        },
        {
          label: 'Méritos',
          href: '/dashboard/legajo/meritos',
          icon: <GiDiploma className="h-5 w-5"/>,
        },
        {
          label: 'Discapacidad',
          href: '/dashboard/legajo/discapacidad',
          icon: <TbDisabled className="h-5 w-5"/>,
        },
        {
          label: 'Acta de entrega',
          href: '/dashboard/legajo/acta-entrega',
          icon: <FaBook className="h-5 w-5"/>,
        },
        {
          label: 'Constancia de pagos de haberes y descuentos',
          href: '/dashboard/legajo/pagos',
          icon: <Receipt className="h-5 w-5"/>,
        },
      ]
    }
  ]
}

export const SIDEBAR_USER_HELP: SidebarMenu = {
  title: 'Ayuda',
  options: [
    {
      label: 'Apoyo',
      href: '/dashboard/apoyo',
      icon: <RiUserVoiceFill className="h-5 w-5"/>,
    },
    {
      label: 'Configuración',
      href: '/dashboard/configuracion',
      icon: <IoSettings className="h-5 w-5"/>,
    },
  ]
}