import { ModeChange } from "../mode-change";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import AvatarUser from "./avatar-user";

function Header({ toggleSidebar }: { toggleSidebar: () => void; roleUser: string }) {
  return (
    <header className="bg-white dark:bg-[#1D1E24] flex w-full items-center p-4">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Abrir menú</span>
      </Button>
      <div className="w-full flex items-center justify-end gap-4">
        <ModeChange />
        <AvatarUser />
      </div>
    </header>
  );
}

export default Header;
