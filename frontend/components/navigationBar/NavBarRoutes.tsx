"use client";
import {
  BOOKS_PAGE_ROUTE,
  DASHBOARD_PAGE_ROUTE,
  GAMES_PAGE_ROUTE,
  MOVIES_PAGE_ROUTE,
  TV_SERIES_PAGE_ROUTE,
} from "@/utils/constants";
import {
  Button,
  ButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import NavBarDrawerMenu from "./NavBarDrawerMenu";

export const NAVBAR_PAGES = [
  { route: DASHBOARD_PAGE_ROUTE, label: "Dashboard" },
  { route: MOVIES_PAGE_ROUTE, label: "Movies" },
  { route: TV_SERIES_PAGE_ROUTE, label: "TV Series" },
  { route: BOOKS_PAGE_ROUTE, label: "Books" },
  // { route: GAMES_PAGE_ROUTE, label: "Games" },
];

const NavBarRoutes: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {isMobile && <NavBarDrawerMenu />}
      <Link href={DASHBOARD_PAGE_ROUTE}>
        <Typography variant="h6" className="pr-2.5">
          Omniflix
        </Typography>
      </Link>
      {!isMobile && (
        <ButtonGroup>
          {NAVBAR_PAGES.map(({ route, label }) => (
            <Button key={route} variant="text" className="!px-5">
              <Link href={route}>
                <Typography textAlign="center" color="white">
                  {label}
                </Typography>
              </Link>
            </Button>
          ))}
        </ButtonGroup>
      )}
    </>
  );
};

export default NavBarRoutes;
