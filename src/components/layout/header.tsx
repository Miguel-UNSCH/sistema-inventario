import { ModeChange } from "../mode-change";
import { Menu } from "lucide-react";
// import { UserButton } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";
// import { useTheme } from "next-themes";
import { Button } from "../ui/button";

function Header({ toggleSidebar }: { toggleSidebar: () => void; roleUser: string }) {
  // const { theme } = useTheme();
  return (
    <header className="bg-white dark:bg-[#1D1E24] flex w-full items-center p-4">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Abrir menú</span>
      </Button>
      <div className="w-full flex items-center justify-end gap-4">
        <ModeChange />
        {/* {
        theme === 'dark' ? (
          <UserButton userProfileUrl={roleUser === 'admin' ? "/admin/dashboard/configuracion/profile" : "/dashboard/configuracion/profile"} appearance={{baseTheme: dark}}></UserButton>
        ) : <UserButton userProfileUrl={roleUser === 'admin' ? "/admin/dashboard/configuracion/profile" : "/dashboard/configuracion/profile"}></UserButton>
      } */}
      </div>
    </header>
  );
}

export default Header;
