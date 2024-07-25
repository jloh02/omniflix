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
export const FOLLOWING_ROUTE = "/following";
export const COLLECTIONS_ROUTE = "/collections";
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

// Time to delay before sending a batch request to database query
// Only for functions using DebouncedSupabaseQuery
export const BATCH_DEBOUNCE_DURATION_IN_MS = 200;

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
  USER_FOLLOWING = "user_following",
  FRIEND_REQUESTS = "friend_requests",
  FRIENDSHIPS = "friendships",
  MOVIES_CACHE = "movies",
  TV_SERIES_CACHE = "tv_series",
  BOOKS_CACHE_TABLE = "books",
  MEDIA = "media",
  COLLECTIONS = "collections",
  COLLECTION_COLLABORATORS = "collection_users",
  COLLECTION_ENTRIES = "collection_entries",
}

// Database aggregated views
export enum DatabaseViews {
  RECOMMENDATIONS = "user_recommendations",
  TOP_LIKES = "top_likes",
  TOP_FAVORITES = "top_favorites",
  TOP_REVIEWS = "top_reviews",
  DISCOVER_LATEST = "discover_latest",
  COLLECTION_COLLABORATORS_ITEMS = "collection_users_items",
}

// Datable Constants and Types
export const COMPLETED_STATUS_COLUMN_INDEX = 2;
export enum MediaType {
  MOVIE = "movie",
  TV_SERIES = "tv_series",
  BOOK = "book",
}
export enum LikeStatus {
  LIKE = 1,
  NONE = 0,
  DISLIKE = -1,
}
export enum FriendRequestDirection {
  FROM_USER1 = "FROM_USER1",
  FROM_USER2 = "FROM_USER2",
}
// Mapping object to associate enum members with boolean values
const FriendRequestDirectionBooleanMap: Record<
  FriendRequestDirection,
  boolean
> = {
  [FriendRequestDirection.FROM_USER1]: true,
  [FriendRequestDirection.FROM_USER2]: false,
};
// Function to get the boolean value for a given FriendRequestDirection
export function getFriendRequestDirectionBoolean(
  direction: FriendRequestDirection,
): boolean {
  return FriendRequestDirectionBooleanMap[direction];
}
export function getFriendRequestDirectionFromBoolean(
  direction: boolean,
): FriendRequestDirection {
  return direction
    ? FriendRequestDirection.FROM_USER1
    : FriendRequestDirection.FROM_USER2;
}
export enum FriendshipStatus {
  NONE,
  PENDING_ME,
  PENDING_THEM,
  FRIENDS,
}

// Supabase edge function names
export enum FunctionNames {
  SEARCH_OMDB = "search-omdb",
  SEARCH_BOOKS = "search-books",
  WATCHLIST = "watchlist",
  OMDB_DETAILS = "omdb-details",
  BOOK_DETAILS = "book-details",
  DELETE_ACCOUNT = "delete-account",
  UPCOMING_MOVIE_TV = "latest",
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
  Books: MediaType.BOOK,
};

// Utility for converting media type to various parameters
export type MediaTypeParam = {
  tableName: TableNames;
  omdbType: OMDBType | null;
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
  [MediaType.BOOK]: {
    tableName: TableNames.BOOKS_CACHE_TABLE,
    omdbType: null,
    label: "Book",
    urlPath: BOOKS_PAGE_ROUTE,
  },
};

// Local storage keys
export enum LocalStorageKeys {
  WATCHLIST = "watchlist",
  FAVORITES = "favorites",
}
