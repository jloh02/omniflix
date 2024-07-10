// Mapping of OMDB movie object key names to usable key name
type KeyValueMap = { [key: string]: any };
const KEY_MAP: KeyValueMap = {
  Title: "title",
  Year: "year",
  imdbID: "imdb_id",
  Poster: "poster_url",
  imdbRating: "imdb_rating",
  imdbVotes: "imdb_votes",
  Genre: "genre",
  Plot: "plot",
  Rated: "rated",
  Released: "released",
  Runtime: "runtime",
  Director: "director",
  Writer: "writer",
  Actors: "actors",
  Language: "language",
  Country: "country",
  Awards: "awards",
  Ratings: "ratings",
  Metascore: "metascore",
  Type: "type",
  DVD: "dvd",
  BoxOffice: "box_office",
  Production: "production",
  Website: "website",
};

const mapOmdbKeys = (omdbResult: KeyValueMap) => {
  const newObj: KeyValueMap = {};
  for (const key in KEY_MAP) {
    if (key in omdbResult) {
      newObj[KEY_MAP[key]] = omdbResult[key];
    }
  }
  return newObj;
};

export { mapOmdbKeys };
