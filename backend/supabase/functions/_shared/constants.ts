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
  MEDIA = "media",
}

export type { OMDBType };
export { ALLOWED_OMDB_TYPES, TableNames, WatchlistAction };
