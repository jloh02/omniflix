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
          <Typography variant="h6" sx={{ paddingRight: "10px" }}>
            Omniflix
          </Typography>
        </Link>
        <ButtonGroup>
          {pages.map((page) => (
            <Button key={page} variant="text" sx={{ padding: "0 20px" }}>
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
