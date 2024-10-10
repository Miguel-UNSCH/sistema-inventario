import { ReactNode } from "react";

// Tipo para las opciones individuales
interface MenuOption {
  label: string;
  href?: string; // Algunas opciones pueden no tener `href`, como los submenús.
  icon?: ReactNode; // El icono es opcional y puede ser cualquier nodo React (JSX).
  children?: MenuOption[]; // Submenús.
}

// Tipo para el menú completo
export interface SidebarMenu {
  title: string;
  options: MenuOption[];
}
