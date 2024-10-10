import Dashboard from "@/components/dashboard";
import { SIDEBAR_USER_HELP, SIDEBAR_USER_MENU } from "@/utils/sidebar/sidebar-user";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel de control - usuario",
};
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Dashboard roleUser="member" sidebarOptions={[SIDEBAR_USER_MENU, SIDEBAR_USER_HELP]}>{children}</Dashboard>
  );
}