"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames, MediaType, MediaTypeToParam } from "@/utils/constants";
import { Tables } from "@/utils/supabase/types.gen";
import getMovieDetails from "@/utils/database/movies/getMovieDetails";
import IMovieDetails from "@/utils/types/IMovieTvSeriesDetails";

async function getFavorites(
  type: MediaType,
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
    .select(`media_id, ${TableNames.MEDIA}:media_id!inner(media_type)`)
    .eq("user_id", user.id)
    .eq(`${TableNames.MEDIA}.media_type`, type)
    .returns<Tables<TableNames.FAVORITES>[]>();

  if (error) {
    throw new Error(
      "Error encountered when getting Favorites. Please try again later.",
    );
  }
  // Extract media_id
  const mediaIds: number[] = data ? data.map((item: any) => item.media_id) : [];

  // Fetch movie details
  const { omdbType } = MediaTypeToParam[type];
  const movieDetails = await Promise.all(
    mediaIds.map(async (id) => await getMovieDetails(id, omdbType)),
  );

  return movieDetails.filter(
    (movieDetail) => movieDetail !== undefined,
  ) as IMovieDetails[];
}

export default getFavorites;
