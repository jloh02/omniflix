export const CATEGORIES = ["Movies", "TV Series", "Books", "Games"];

// Web URL paths
export const HOME_PAGE_ROUTE = "/";
export const LOGIN_PAGE_ROUTE = "/signin";
export const SIGNUP_PAGE_ROUTE = "/signup";
export const FORGOT_PASSWORD_PAGE_ROUTE = "/forgot-password";
export const RESET_PASSWORD_PAGE_ROUTE = "/reset-password";
export const AUTH_PAGE_ROUTE = "/auth/callback";
export const ONBOARDING_PAGE_ROUTE = "/getting-started";
export const PROFILE_PAGE_ROUTE = "/profile";
export const USER_PUBLIC_PROFILE_PAGE_ROUTE = "/user";
export const USER_REVIEWS_ROUTE = "/profile/reviews";
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
export const PUBLIC_ROUTES = [
  HOME_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  SIGNUP_PAGE_ROUTE,
  FORGOT_PASSWORD_PAGE_ROUTE,
  RESET_PASSWORD_PAGE_ROUTE,
  AUTH_PAGE_ROUTE,
];

// Constants for OMDB API
export const OMDB_API_URL = "http://www.omdbapi.com/";
export const OMDB_API_KEY = process.env.NEXT_OMDB_API_KEY;
export const DEBOUNCE_DURATION_IN_MS = 500;
export const MINIMUM_SEARCH_LENGTH = 2;
export const ALLOWED_OMDB_TYPES = ["movie", "series", "episode"] as const;
export type OMDBType = (typeof ALLOWED_OMDB_TYPES)[number];

// User Info constants
export const NAME_MAX_CHAR_LENGTH = 30;
export const USERNAME_MAX_CHAR_LENGTH = 30;
export const BIO_MAX_CHAR_LENGTH = 150;
export const PASSWORD_MIN_CHAR_LENGTH = 6;

// Database table names
export enum TableNames {
  USERS_INFO = "users_info",
  WATCHLIST = "watchlist_entries",
  FAVORITES = "favorites_entries",
  LIKES_DISLIKES = "likes_dislikes",
  REVIEWS = "reviews",
  MOVIES_CACHE = "movies",
  TV_SERIES_CACHE = "tv_series",
  MEDIA = "media",
}

// Datable Constants and Types
export const COMPLETED_STATUS_COLUMN_INDEX = 2;
export enum MediaType {
  MOVIE = "movie",
  TV_SERIES = "tv_series",
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

// Utility to convert category into a media type
export const CategoryToMediaType: Record<string, MediaType> = {
  Movies: MediaType.MOVIE,
  "TV Series": MediaType.TV_SERIES,
};

// Utility for converting media type to various parameters
export type MediaTypeParam = {
  tableName: TableNames;
  omdbType: OMDBType;
  label: string;
  urlPath: string;
};
export const MediaTypeToParam: Record<MediaType, MediaTypeParam> = {
  [MediaType.MOVIE]: {
    tableName: TableNames.MOVIES_CACHE,
    omdbType: "movie",
    label: "Movie",
    urlPath: MOVIES_PAGE_ROUTE,
  },
  [MediaType.TV_SERIES]: {
    tableName: TableNames.TV_SERIES_CACHE,
    omdbType: "series",
    label: "TV Series",
    urlPath: TV_SERIES_PAGE_ROUTE,
  },
};
