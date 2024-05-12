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

const pages = ["Home", "Movies", "TV Series", "Books", "Games"];
const NavigationBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link href="/">
          <Typography variant="h6">Omniflix</Typography>
        </Link>
        <ButtonGroup>
          {pages.map((page) => (
            <Button key={page}>
              <Link
                href={`/${
                  page === "Home" ? "" : page.toLowerCase().replace(/\s/g, "-")
                }`}
              >
                <Typography textAlign="center" color="white">
                  {page}
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
