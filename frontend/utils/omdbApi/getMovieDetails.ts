"use server";
import { OMDB_API_KEY, OMDB_API_URL } from "../constants";
import { objectKeysToLowerCase } from "../objectKeysToLowerCase";
import IMovieDetails from "../types/IMovieDetails";

async function getMovieDetails(
  movieId: string,
): Promise<IMovieDetails | undefined> {
  const res = await fetch(
    `${OMDB_API_URL}?apikey=${OMDB_API_KEY}&i=${movieId}&type=movie`,
  );
  const resBody = await res.json();
  if (resBody.Error) return;

  return objectKeysToLowerCase(resBody) as IMovieDetails;
}

export default getMovieDetails;
