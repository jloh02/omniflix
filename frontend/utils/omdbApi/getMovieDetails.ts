"use server";
import { objectKeysToLowerCase } from "../objectKeysToLowerCase";
import IMovieDetails from "../types/IMovieDetails";

async function getMovieDetails(
  movieId: string,
): Promise<IMovieDetails | undefined> {
  const OMDB_API_KEY = process.env.NEXT_OMDB_API_KEY;
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movieId}&type=movie`,
  );
  const resBody = await res.json();
  if (resBody.Error) return;

  return objectKeysToLowerCase(resBody) as IMovieDetails;
}

export default getMovieDetails;
