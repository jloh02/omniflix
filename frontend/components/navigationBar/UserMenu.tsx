"use client";
import {
  Avatar,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useCallback, useState } from "react";
import Link from "next/link";
import LogoutMenuItem from "./LogoutMenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Person from "@mui/icons-material/Person";
import {
  COLLECTIONS_ROUTE,
  FOLLOWING_ROUTE,
  FRIENDS_ROUTE,
  PROFILE_PAGE_ROUTE,
  USER_REVIEWS_ROUTE,
} from "@/utils/constants";
import { Diversity1, Folder, Group, RateReview } from "@mui/icons-material";

const MENU_ITEMS = [
  { route: PROFILE_PAGE_ROUTE, label: "Profile", icon: <Person /> },
  { route: FRIENDS_ROUTE, label: "My Friends", icon: <Diversity1 /> },
  { route: FOLLOWING_ROUTE, label: "My Following", icon: <Group /> },
  { route: USER_REVIEWS_ROUTE, label: "My Reviews", icon: <RateReview /> },
  { route: COLLECTIONS_ROUTE, label: "Collections", icon: <Folder /> },
];

export default function UserMenu() {
  const UserNavMenuItem: React.FC<{
    route: string;
    label: string;
    icon: JSX.Element;
  }> = ({ route, label, icon }) => (
    <Link href={route}>
      <MenuItem>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{label}</ListItemText>
      </MenuItem>
    </Link>
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar />
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {MENU_ITEMS.map((item) => (
          <UserNavMenuItem
            key={item.route}
            route={item.route}
            label={item.label}
            icon={item.icon}
          />
        ))}
        <LogoutMenuItem />
      </Menu>
    </>
  );
}
