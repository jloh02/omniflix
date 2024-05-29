"use server";
import { createClient } from "@/utils/supabase/server";
import { FAVORITES_TABLE } from "../constants";
import getMovieDetails from "../omdbApi/getMovieDetails";
import IMovieDetails from "../types/IMovieDetails";

async function getFavorites(
  mediaType: string,
): Promise<IMovieDetails[] | undefined> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase
    .from(FAVORITES_TABLE)
    .select("media_id")
    .eq("user_id", user.id)
    .eq("media_type", mediaType);

  if (error) {
    console.log("Error retrieving favorites");
    return;
  }
  const movieIds: string[] = data ? data.map((item: any) => item.media_id) : [];

  const movieDetails = await Promise.all(
    movieIds.map(async (movieId) => await getMovieDetails(movieId)),
  );

  return movieDetails.filter(
    (movieDetail) => movieDetail !== undefined,
  ) as IMovieDetails[];
}

export default getFavorites;
