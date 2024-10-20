"use client";

import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import { signOut } from "next-auth/react";
import Link from "next/link";

function AvatarUser() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="border-2 border-primary rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="user" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4 mt-2 border">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="border-t border-b space-y-2 py-2">
          <DropdownMenuItem className="cursor-pointer w-full p-0">
            <Link href={"/dashboard/cuenta"} className="flex p-2">
              <User className="mr-2 h-4 w-4" />
              <span>Cuenta</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer w-full p-0">
            <Link href={"/dashboard/configuracion"} className="flex p-2">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración general</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full p-0 mb-2">
          <Button onClick={() => signOut({
            callbackUrl: '/'
          })} className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sessión
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarUser;
