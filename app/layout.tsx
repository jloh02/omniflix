import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
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
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </main>
      </body>
    </html>
  );
}
