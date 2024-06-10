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
  poster: string;
  ratings: { Source: string; Value: string }[];
  metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  type: string;
  dVD: string;
  boxOffice: string;
  production: string;
  website: string;
}

export default IMovieDetails;
