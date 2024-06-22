import AuthButton from "./AuthButton";
import { AppBar, Box, Toolbar } from "@mui/material";
import NavBarRoutes from "./NavBarRoutes";

const NavigationBar = () => {
  return (
    <AppBar className="!sticky">
      <Toolbar>
        <NavBarRoutes />
        <Box className="grow" />
        <AuthButton />
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
