export const CATEGORIES = ["Movies", "TV Series", "Books", "Games"];

// Web URL paths
export const HOME_PAGE_ROUTE = "/";
export const LOGIN_PAGE_ROUTE = "/login";
export const PROFILE_PAGE_ROUTE = "/profile";
export const DASHBOARD_PAGE_ROUTE = "/dashboard";
export const FRIENDS_ROUTE = "/friends";
export const MOVIES_PAGE_ROUTE = "/movies";
export const TV_SERIES_PAGE_ROUTE = "/tv-series";
export const BOOKS_PAGE_ROUTE = "/books";
export const GAMES_PAGE_ROUTE = "/games";

export const API_ROUTE = "/api";
export const API_PREFIX = API_ROUTE + "/v1";
export const OMDB_ROUTE = API_PREFIX + "/omdb";

// Assume all paths are protected
export const PUBLIC_ROUTES = [HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE];

// Constants for OMDB API
export const OMDB_API_URL = "http://www.omdbapi.com/";
export const OMDB_API_KEY = process.env.NEXT_OMDB_API_KEY;
export const DEBOUNCE_DURATION_IN_MS = 500;
export const MINIMUM_SEARCH_LENGTH = 2;
export const ALLOWED_OMDB_TYPES = ["movie", "series", "episode"] as const;
export type OMDBType = (typeof ALLOWED_OMDB_TYPES)[number];

// Database table names
export const WATCHLIST_TABLE = "watchlist_entries";
export const FAVORITES_TABLE = "favorites_entries";
export const MOVIES_CACHE_TABLE = "movies";

export enum MediaType {
  MOVIE = "movie",
}

// Supabase edge function names
export const SEARCH_OMDB_FUNCTION = "search-omdb";
export const WATCHLIST_FUNCTION = "watchlist";
export enum WatchlistFunctionAction {
  ADD = "add",
  REMOVE = "remove",
  UPDATE = "update",
}

// App Colors
export const BACKGROUND = "#121212";
export const TEXT = "#ffffff";
export const TEXT_SECONDARY = "#ffffffb3";
export const TEXT_DISABLED = "#ffffff80";
export const PRIMARY = "#003366";
export const PRIMARY_LIGHT = "0088cc";
export const PRIMARY_DARK = "#002347";
export const SECONDARY = "#fd7702";
export const SECONDARY_LIGHT = "#ff8e00";
export const SECONDARY_DARK = "#ff5003";
