const OMDB_CACHE_DURATION_MS = 1000 * 60 * 60 * 24; // 1 day
const GOOGLE_BOOK_CACHE_DURATION_MS = 30 * 1000 * 60 * 60 * 24; // 30 days

const ALLOWED_OMDB_TYPES = ["movie", "series", "episode"] as const;
type OMDBType = (typeof ALLOWED_OMDB_TYPES)[number];

const ALLOWED_TMDB_TYPES = ["movie", "tv"] as const;
type TMDBType = (typeof ALLOWED_TMDB_TYPES)[number];

enum MediaType {
  MOVIE = "movie",
  TV_SERIES = "tv_series",
  BOOK = "book",
}

enum WatchlistAction {
  ADD = "add",
  REMOVE = "remove",
  UPDATE = "update",
}

enum TableNames {
  WATCHLIST = "watchlist_entries",
  MOVIES_CACHE_TABLE = "movies",
  TV_SERIES_CACHE_TABLE = "tv_series",
  BOOKS_CACHE_TABLE = "books",
  MEDIA = "media",
  UPCOMING = "upcoming",
}

const OMDB_TYPE_TO_TABLE: Record<OMDBType, string> = {
  movie: TableNames.MOVIES_CACHE_TABLE,
  series: TableNames.TV_SERIES_CACHE_TABLE,
  episode: TableNames.TV_SERIES_CACHE_TABLE,
};

const OMDB_TYPE_TO_MEDIA_TYPE: Record<OMDBType, MediaType> = {
  movie: MediaType.MOVIE,
  series: MediaType.TV_SERIES,
  episode: MediaType.TV_SERIES,
};

const OMDB_TYPE_TO_TMDB_TYPE: Record<OMDBType, TMDBType> = {
  movie: "movie",
  series: "tv",
  episode: "tv",
};

export type { OMDBType, TMDBType };
export {
  OMDB_CACHE_DURATION_MS,
  GOOGLE_BOOK_CACHE_DURATION_MS,
  ALLOWED_OMDB_TYPES,
  ALLOWED_TMDB_TYPES,
  OMDB_TYPE_TO_TABLE,
  OMDB_TYPE_TO_MEDIA_TYPE,
  OMDB_TYPE_TO_TMDB_TYPE,
  MediaType,
  TableNames,
  WatchlistAction,
};
