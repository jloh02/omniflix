"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames, MediaTypeToParam } from "@/utils/constants";
import { Tables } from "@/utils/supabase/types.gen";
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
    .select(`media_id, ${TableNames.MEDIA}:media_id!inner(media_type)`)
    .eq("collection_id", collectionId);

  if (error) {
    throw new Error(
      "Error encountered when getting collection items. Please try again later.",
    );
  }

  // Fetch media details
  const mediaDetails = await Promise.all(
    data.map(
      async (item: any) => await getOmdbDetails(item.media_id, item.media_type),
    ),
  );

  return mediaDetails.filter(
    (mediaDetail) => mediaDetail !== undefined,
  ) as IMovieTvSeriesDetails[];
}

export default getCollectionItems;
