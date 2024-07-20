"use client";
import { usePathname } from "next/navigation";
import {
  Icon,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import Link from "next/link";
import {
  COLLECTIONS_ROUTE,
  FOLLOWING_ROUTE,
  FRIENDS_ROUTE,
  PROFILE_PAGE_ROUTE,
  USER_REVIEWS_ROUTE,
} from "@/utils/constants";
import {
  Diversity1,
  Folder,
  Group,
  Person,
  RateReview,
} from "@mui/icons-material";

const MENU_ITEMS = [
  { route: PROFILE_PAGE_ROUTE, label: "Basic Info", icon: <Person /> },
  { route: FRIENDS_ROUTE, label: "Friends", icon: <Diversity1 /> },
  { route: FOLLOWING_ROUTE, label: "Following", icon: <Group /> },
  { route: USER_REVIEWS_ROUTE, label: "Reviews", icon: <RateReview /> },
  { route: COLLECTIONS_ROUTE, label: "Collections", icon: <Folder /> },
];

export default function UserSectionsNavMenu() {
  const pathname = usePathname();

  const UserSectionsNavMenuItem: React.FC<{
    route: string;
    label: string;
    icon: JSX.Element;
  }> = ({ route, label, icon }) => (
    <Link href={route}>
      <MenuItem selected={pathname === route}>
        <ListItemIcon>{icon}</ListItemIcon>
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
      {MENU_ITEMS.map((item) => (
        <UserSectionsNavMenuItem
          key={item.route}
          route={item.route}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </MenuList>
  );
}
