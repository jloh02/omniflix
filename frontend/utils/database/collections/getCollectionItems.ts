"use server";

import { createClient } from "@/utils/supabase/server";
import { MediaTypeToParam, TableNames } from "@/utils/constants";
import getOmdbDetails from "@/utils/database/omdb/omdbDetails";
import IMovieTvSeriesDetails from "@/utils/types/IMovieTvSeriesDetails";

async function getCollectionItems(
  collectionId: number,
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

  // Fetch collection items
  const { data, error } = await supabase
    .from(TableNames.COLLECTION_ENTRIES)
    .select(
      `media_id, media_type:${TableNames.MEDIA}!${TableNames.COLLECTION_ENTRIES}_media_id_fkey(media_type)`,
    )
    .eq("collection_id", collectionId);

  if (error) {
    throw new Error(
      "Error encountered when getting collection items. Please try again later.",
    );
  }

  // Fetch media details
  const mediaDetails = await Promise.all(
    data.map(async (item) => {
      const mediaDetails = await getOmdbDetails(
        item.media_id,
        MediaTypeToParam[item.media_type.media_type].omdbType,
      ); //TODO: Fix type error
      if (!mediaDetails) {
        return;
      }
      mediaDetails.mediaType = item.media_type.media_type;
      return mediaDetails;
    }),
  );

  return mediaDetails.filter(
    (mediaDetail) => mediaDetail !== undefined,
  ) as IMovieTvSeriesDetails[];
}

export default getCollectionItems;
