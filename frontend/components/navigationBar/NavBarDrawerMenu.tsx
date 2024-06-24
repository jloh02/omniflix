"use client";
import React, { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Menu } from "@mui/icons-material";
import { NAVBAR_PAGES } from "./NavBarRoutes";

const NavBarDrawerMenu: React.FC = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: any) => {
    setDrawerOpen(open);
  };

  return (
    <>
      <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
        <Menu />
      </IconButton>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={toggleDrawer(false)}>
            {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
        <Divider />
        <List>
          {NAVBAR_PAGES.map(({ route, label }) => (
            <ListItem key={label} onClick={toggleDrawer(false)}>
              <Link href={route}>
                <ListItemText primary={label} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBarDrawerMenu;
