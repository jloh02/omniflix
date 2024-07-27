"use server";

import { createClient } from "@/utils/supabase/server";
import {
  TableNames,
  MediaType,
  MediaTypeToParam,
  OMDBType,
} from "@/utils/constants";
import { Tables } from "@/utils/supabase/types.gen";
import getOmdbDetails from "@/utils/database/omdb/omdbDetails";
import IMovieTvSeriesDetails from "@/utils/types/IMovieTvSeriesDetails";
import getBookDetails from "../books/getBookDetails";
import IBook from "@/utils/types/IBook";

async function getFavorites(
  mediaType: MediaType,
): Promise<IMovieTvSeriesDetails[] | undefined> {
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
    .eq(`${TableNames.MEDIA}.media_type`, mediaType)
    .returns<Tables<TableNames.FAVORITES>[]>();

  if (error) {
    console.error(error);
    throw new Error(
      "Error encountered when getting Favorites. Please try again later.",
    );
  }
  // Extract media_id
  const mediaIds: number[] = data ? data.map((item: any) => item.media_id) : [];

  let getDetails: (
    mediaId: number,
    mediaType: MediaType,
  ) => Promise<IMovieTvSeriesDetails | IBook | undefined>;
  if (mediaType === MediaType.BOOK) {
    getDetails = async (mediaId: number, mediaType: MediaType) => {
      return await getBookDetails(mediaId);
    };
  } else {
    getDetails = async (mediaId: number, mediaType: MediaType) => {
      const { omdbType } = MediaTypeToParam[mediaType];
      return await getOmdbDetails(mediaId, omdbType as OMDBType);
    };
  }

  // Fetch movie details
  const movieDetails = await Promise.all(
    mediaIds.map(async (id) => await getDetails(id, mediaType)),
  );

  return movieDetails.filter(
    (movieDetail) => movieDetail !== undefined,
  ) as IMovieTvSeriesDetails[];
}

export default getFavorites;
