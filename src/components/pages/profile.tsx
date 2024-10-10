"use client";

import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

function Profile() {

  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h1 className="text-2xl font-semibold">Administrar cuenta</h1>
      {
        theme === 'dark' ? (
          <UserProfile appearance={{baseTheme: dark}}/>
        ) : <UserProfile />
      }
    </div>
  )
}

export default Profile;
