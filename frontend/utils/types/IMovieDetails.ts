import IMovie from "@/utils/types/IMovie";

interface IMovieDetails extends IMovie {
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster_url: string;
  ratings: { Source: string; Value: string }[];
  metascore: string;
  imdb_rating: string;
  imdb_votes: string;
  imdbID: string;
  type: string;
  dVD: string;
  boxOffice: string;
  production: string;
  website: string;
}

export default IMovieDetails;
