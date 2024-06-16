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
export enum TableNames {
  WATCHLIST = "watchlist_entries",
  FAVORITES = "favorites_entries",
  LIKES_DISLIKES = "likes_dislikes",
  REVIEWS = "reviews",
  MOVIES_CACHE = "movies",
}

// Datable Constants and Types
export const COMPLETED_STATUS_COLUMN_INDEX = 2;
export enum MediaType {
  MOVIE = "movie",
}
export enum LikeStatus {
  LIKE = 1,
  NONE = 0,
  DISLIKE = -1,
}

// Supabase edge function names
export enum FunctionNames {
  SEARCH_OMDB = "search-omdb",
  WATCHLIST = "watchlist",
  OMDB_DETAILS = "omdb-details",
}
export enum WatchlistFunctionAction {
  ADD = "add",
  REMOVE = "remove",
  UPDATE = "update",
}
