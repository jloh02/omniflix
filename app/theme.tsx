"use client";

import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#223bc9",
      light: "#067fd0",
      dark: "#151a7b",
    },
    secondary: {
      main: "#e63b60",
    },
  },
};
const theme = createTheme(themeOptions);

export { theme };
