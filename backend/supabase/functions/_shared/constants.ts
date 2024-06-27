const ALLOWED_OMDB_TYPES = ["movie", "series", "episode"] as const;
type OMDBType = (typeof ALLOWED_OMDB_TYPES)[number];

enum WatchlistAction {
  ADD = "add",
  REMOVE = "remove",
  UPDATE = "update",
}

enum TableNames {
  WATCHLIST = "watchlist_entries",
  MOVIES_CACHE_TABLE = "movies",
  TV_SERIES_CACHE_TABLE = "tv_series",
  MEDIA = "media",
}

const OMDB_TYPE_TO_TABLE: Record<OMDBType, string> = {
  movie: TableNames.MOVIES_CACHE_TABLE,
  series: TableNames.TV_SERIES_CACHE_TABLE,
  episode: TableNames.TV_SERIES_CACHE_TABLE,
};

export type { OMDBType };
export { ALLOWED_OMDB_TYPES, OMDB_TYPE_TO_TABLE, TableNames, WatchlistAction };
