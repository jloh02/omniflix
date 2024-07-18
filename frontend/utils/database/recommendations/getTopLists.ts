"use server";

import { createClient } from "@/utils/supabase/server";
import { DatabaseViews, MediaType, MediaTypeToParam } from "../../constants";
import IMovieTvSeries from "@/utils/types/IMovieTvSeries";

async function getTopLists(
  mediaType: MediaType,
): Promise<Record<string, IMovieTvSeries[]>> {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { tableName } = MediaTypeToParam[mediaType];

  const processTopList = async (
    view: DatabaseViews,
  ): Promise<IMovieTvSeries[] | null> => {
    const { data, error } = await supabase
      .from(view)
      .select(`media_id, ${tableName}(*)`)
      .eq("media_type", mediaType)
      .limit(10);

    if (!data || !data.length || error) return null;

    // TODO handle different media types
    return data.map((d: any) => ({
      mediaId: d.media_id,
      title: d[tableName][0].title,
      year: d[tableName][0].year,
      posterUrl: d[tableName][0].poster_url,
    }));
  };

  // Process all 3 views
  const [reccos, topLikes, topFavorites, topReviews] = await Promise.all(
    [
      DatabaseViews.RECOMMENDATIONS,
      DatabaseViews.TOP_LIKES,
      DatabaseViews.TOP_FAVORITES,
      DatabaseViews.TOP_REVIEWS,
    ].map(processTopList),
  );

  const resolvedData = Object.fromEntries(
    Object.entries({
      "For You": reccos,
      "Most Liked": topLikes,
      "Most Favorited": topFavorites,
      "Top Reviews": topReviews,
    })
      // Only include lists that have data
      .filter(([_, value]) => value !== null) as Array<
      [string, IMovieTvSeries[]]
    >,
  );

  return resolvedData;
}

export default getTopLists;
