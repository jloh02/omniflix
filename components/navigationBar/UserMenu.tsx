"use client";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useCallback, useState } from "react";
import Link from "next/link";
import LogoutMenuItem from "./LogoutMenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Person from "@mui/icons-material/Person";

export default function UserMenu() {
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
        <Link href="/profile">
          <MenuItem>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        </Link>
        <LogoutMenuItem />
      </Menu>
    </>
  );
}
