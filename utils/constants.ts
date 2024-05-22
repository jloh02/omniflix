// Constants for NextJS routing middleware
export const loginPageRoute = "/login";
export const publicRoutes = ["/", "/login"];
export const protectedRoutes = [
  "/api",
  "/books",
  "/games",
  "/movies",
  "/profile",
  "/tv-series",
];

// Constants for OMDB API
export const DEBOUNCE_DURATION_IN_MS = 500;
export const MINIMUM_SEARCH_LENGTH = 2;
export const MINIMUM_OMDB_SEARCH_LENGTH = 3;
