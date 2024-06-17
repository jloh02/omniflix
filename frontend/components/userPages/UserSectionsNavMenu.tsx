"use client";
import { usePathname } from "next/navigation";
import { ListItemText, MenuItem, MenuList } from "@mui/material";
import Link from "next/link";
import {
  FRIENDS_ROUTE,
  PROFILE_PAGE_ROUTE,
  USER_REVIEWS_ROUTE,
} from "@/utils/constants";

const menuItems = [
  { route: PROFILE_PAGE_ROUTE, label: "Basic Info" },
  { route: FRIENDS_ROUTE, label: "Friends" },
  { route: USER_REVIEWS_ROUTE, label: "Reviews" },
];

export default function UserSectionsNavMenu() {
  const pathname = usePathname();

  const UserSectionsNavMenuItem: React.FC<{
    route: string;
    label: string;
  }> = ({ route, label }) => (
    <Link href={route}>
      <MenuItem selected={pathname === route}>
        <ListItemText>{label}</ListItemText>
      </MenuItem>
    </Link>
  );

  return (
    <MenuList
      sx={{
        margin: 2,
        borderRadius: 2,
        width: 200,
      }}
    >
      {menuItems.map((item) => (
        <UserSectionsNavMenuItem
          key={item.route}
          route={item.route}
          label={item.label}
        />
      ))}
    </MenuList>
  );
}
