import {
  BOOKS_PAGE_ROUTE,
  DASHBOARD_PAGE_ROUTE,
  GAMES_PAGE_ROUTE,
  MOVIES_PAGE_ROUTE,
  TV_SERIES_PAGE_ROUTE,
} from "@/utils/constants";
import AuthButton from "../AuthButton";
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";

const PAGES = [
  ["Dashboard", DASHBOARD_PAGE_ROUTE],
  ["Movies", MOVIES_PAGE_ROUTE],
  ["TV Series", TV_SERIES_PAGE_ROUTE],
  ["Books", BOOKS_PAGE_ROUTE],
  ["Games", GAMES_PAGE_ROUTE],
];

const NavigationBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link href={DASHBOARD_PAGE_ROUTE}>
          <Typography variant="h6" sx={{ paddingRight: "10px" }}>
            Omniflix
          </Typography>
        </Link>
        <ButtonGroup>
          {PAGES.map(([pageLabel, path]) => (
            <Button key={path} variant="text" sx={{ padding: "0 20px" }}>
              <Link href={path}>
                <Typography textAlign="center" color="white">
                  {pageLabel}
                </Typography>
              </Link>
            </Button>
          ))}
        </ButtonGroup>
        <Box sx={{ flexGrow: 1 }} />
        <AuthButton />
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
