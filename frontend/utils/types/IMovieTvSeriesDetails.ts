import IMovieTvSeries from "@/utils/types/IMovieTvSeries";
import { MediaType } from "../constants";

interface IMovieTvSeriesDetails extends IMovieTvSeries {
  mediaType: MediaType;
  rated: string;
  released: string;
  runtime: string;
  genre: string[];
  imdbRating: string;
  data: {
    released: string;
    runtime: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    ratings: { Source: string; Value: string }[];
    metascore: string;
    imdbVotes: string;
    type: string;
    dVD: string;
    boxOffice: string;
    production: string;
    website: string;
  };
}

export default IMovieTvSeriesDetails;
