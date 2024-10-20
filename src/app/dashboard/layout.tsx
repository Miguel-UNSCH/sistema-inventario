import Dashboard from "@/components/dashboard";
import { SIDEBAR_USER_HELP, SIDEBAR_USER_MENU } from "@/utils/sidebar/sidebar-user";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sistema gestor de inventario",
};
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  console.log(session);

  if (!session?.user) redirect("/login");

  return (
    <>
      <Dashboard roleUser="member" sidebarOptions={[SIDEBAR_USER_MENU, SIDEBAR_USER_HELP]}>{children}</Dashboard>
      <Toaster />
    </>
  );
}