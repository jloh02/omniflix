"use client";

import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#003366",
      light: "#003f7d",
      dark: "#002347",
    },
    secondary: {
      main: "#fd7702",
      light: "#ff8e00",
      dark: "#ff5003",
    },
    background: {
      default: "#121212",
      paper: "#002347",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "transparent",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "10px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
};
const theme = createTheme(themeOptions);

export { theme };
