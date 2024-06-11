import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: "%s - Omniflix",
    default: "Omniflix",
  },
  description:
    "Your one stop platform to track and organize all the movies, shows, books and games you enjoy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={"h-full w-full " + GeistSans.className}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body className="h-full w-full">
          <main className="flex flex-col items-center h-full w-full">
            {children}
          </main>
        </body>
      </ThemeProvider>
    </html>
  );
}
