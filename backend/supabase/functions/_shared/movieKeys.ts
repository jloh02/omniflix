// Mapping of OMDB movie object key names to usable key name
type KeyValueMap = { [key: string]: any };
const KEY_MAP: KeyValueMap = {
  Title: "title",
  Year: "year",
  imdbID: "imdb_id",
  Poster: "poster_url",
  imdbRating: "imdb_rating",
  Genre: "genre",
  Rated: "rated",
  Released: "released",
  Runtime: "runtime",
};

const mapMovieKeys = (omdbResult: KeyValueMap) => {
  const newObj: KeyValueMap = {};
  for (const key in KEY_MAP) {
    if (key in omdbResult) {
      newObj[KEY_MAP[key]] = omdbResult[key];
    }
  }
  return newObj;
};

export { mapMovieKeys };
