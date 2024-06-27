"use server";

import { createClient } from "@/utils/supabase/server";
import { OMDBType, TableNames } from "@/utils/constants";
import { Tables } from "@/utils/supabase/types.gen";
import getMovieDetails from "@/utils/database/movies/getMovieDetails";
import IMovieDetails from "@/utils/types/IMovieDetails";

async function getFavorites(
  type: OMDBType,
): Promise<IMovieDetails[] | undefined> {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, throw an error
  if (!user) {
    throw new Error("Please login again.");
  }

  // Fetch favorites
  const { data, error } = await supabase
    .from(TableNames.FAVORITES)
    .select(`media_id, ${TableNames.MEDIA}:media_id(media_type)`)
    .eq("user_id", user.id)
    .eq(`${TableNames.MEDIA}.media_type`, mediaType)
    .returns<Tables<TableNames.FAVORITES>[]>();

  if (error) {
    throw new Error(
      "Error encountered when getting Favorites. Please try again later.",
    );
  }
  // Extract media_id
  const mediaIds: number[] = data ? data.map((item: any) => item.media_id) : [];

  // Fetch movie details
  const movieDetails = await Promise.all(
    mediaIds.map(async (id) => await getMovieDetails(id, type)),
  );

  return movieDetails.filter(
    (movieDetail) => movieDetail !== undefined,
  ) as IMovieDetails[];
}

export default getFavorites;
