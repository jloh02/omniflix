// Web URL paths
export const HOME_PAGE_ROUTE = "/";
export const LOGIN_PAGE_ROUTE = "/login";
export const PROFILE_PAGE_ROUTE = "/profile";
export const DASHBOARD_PAGE_ROUTE = "/dashboard";
export const MOVIES_PAGE_ROUTE = "/movies";
export const TV_SERIES_PAGE_ROUTE = "/tv-series";
export const BOOKS_PAGE_ROUTE = "/books";
export const GAMES_PAGE_ROUTE = "/games";

export const API_ROUTE = "/api";
export const API_PREFIX = API_ROUTE + "/v1";
export const OMDB_ROUTE = API_PREFIX + "/omdb";

// Assume all paths are protected
export const PUBLIC_ROUTES = [HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE];

export const NO_NAVBAR_ROUTES = [HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE];

// Constants for OMDB API
export const DEBOUNCE_DURATION_IN_MS = 500;
export const MINIMUM_SEARCH_LENGTH = 2;

export const CATEGORIES = ["Movies", "TV Series", "Books", "Games"];
