"use client";
import { usePathname } from "next/navigation";
import { ListItemText, MenuItem, MenuList } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { FRIENDS_ROUTE, PROFILE_PAGE_ROUTE } from "@/utils/constants";

export default function UserSectionsNavMenu() {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <MenuList
      sx={{
        margin: 2,
        borderRadius: 2,
        width: 200,
      }}
    >
      <Link href={PROFILE_PAGE_ROUTE}>
        <MenuItem selected={pathname === PROFILE_PAGE_ROUTE}>
          <ListItemText>Basic Info</ListItemText>
        </MenuItem>
      </Link>
      <Link href={FRIENDS_ROUTE}>
        <MenuItem selected={pathname === FRIENDS_ROUTE}>
          <ListItemText>Friends</ListItemText>
        </MenuItem>
      </Link>
    </MenuList>
  );
}
