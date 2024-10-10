"use client";

import { useState } from "react";
import Aside from "./layout/aside";
import Header from "./layout/header";
import { SidebarMenu } from "@/types/opciones_menu";

function Dashboard({
  children,
  sidebarOptions,
  roleUser,
}: Readonly<{
  children: React.ReactNode,
  sidebarOptions: SidebarMenu[];
  roleUser: string; // 'admin' ||'member'
}>) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [sidebarMinimize, setsidebarMinimize] = useState(false);

  const toggleSidebar = () => setOpenSidebar(!openSidebar);
  const toogleMinimizeSidebar = () => setsidebarMinimize(!sidebarMinimize);

  return (
    <div className="flex min-h-screen h-screen w-full">
      <Aside sidebarOptions={sidebarOptions} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} sidebarMinimize={sidebarMinimize} toogleMinimizeSidebar={toogleMinimizeSidebar} toggleSidebar={toggleSidebar} />
      <div className="relative flex h-[100vh] flex-col flex-1">
        {
          openSidebar && <div onClick={() => (setOpenSidebar(false))} className={`lg:hidden absolute w-full h-full bg-black opacity-35`}></div>
        }
        <Header roleUser={roleUser} toggleSidebar={toggleSidebar} />
        <main className="bg-background text-foreground h-full p-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
