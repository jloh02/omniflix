"use client";

import { signOut } from "@/utils/supabase/auth";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import { HOME_PAGE_ROUTE } from "@/utils/constants";
import { useRouter } from "next/navigation";

export default function LogoutMenuItem() {
  const router = useRouter();
  return (
    <MenuItem
      onClick={async () => {
        await signOut();
        router.push(HOME_PAGE_ROUTE);
      }}
    >
      <ListItemIcon>
        <Logout fontSize="small" />
      </ListItemIcon>
      Logout
    </MenuItem>
  );
}
