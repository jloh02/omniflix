"use server";

import { createClient } from "@/utils/supabase/server";
import { DatabaseViews, MediaType, MediaTypeToParam } from "../../constants";
import IMovieTvSeries from "@/utils/types/IMovieTvSeries";
import IBook from "@/utils/types/IBook";

async function getTopLists<T extends IMovieTvSeries | IBook>(
  mediaType: MediaType,
): Promise<Record<string, T[]>> {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { tableName } = MediaTypeToParam[mediaType];
  let mapper: (d: any) => IMovieTvSeries | IBook;
  if (mediaType === MediaType.BOOK) {
    mapper = (d: any) =>
      ({
        mediaId: d.media_id,
        title: d[tableName][0].title,
        publishedDate: d[tableName][0].publishedDate,
        imageLink: d[tableName][0].imageLink,
      }) as IBook;
  } else {
    mapper = (d: any) =>
      ({
        mediaId: d.media_id,
        title: d[tableName][0].title,
        year: d[tableName][0].year,
        posterUrl: d[tableName][0].poster_url,
      }) as IMovieTvSeries;
  }

  const processTopList = async (
    view: DatabaseViews,
  ): Promise<(IMovieTvSeries | IBook)[] | null> => {
    const { data, error } = await supabase
      .from(view)
      .select(`media_id, ${tableName}(*)`)
      .eq("media_type", mediaType)
      .limit(10);

    if (!data || !data.length || error) return null;

    return data.map(mapper);
  };

  // Process all 3 views
  const [reccos, latest, topLikes, topFavorites, topReviews] =
    await Promise.all(
      [
        DatabaseViews.RECOMMENDATIONS,
        DatabaseViews.DISCOVER_LATEST,
        DatabaseViews.TOP_LIKES,
        DatabaseViews.TOP_FAVORITES,
        DatabaseViews.TOP_REVIEWS,
      ].map(processTopList),
    );

  const resolvedData = Object.fromEntries(
    Object.entries({
      "For You": reccos,
      "Latest Releases": latest,
      "Most Liked": topLikes,
      "Most Favorited": topFavorites,
      "Top Reviews": topReviews,
    })
      // Only include lists that have data
      .filter(([_, value]) => value !== null) as Array<[string, T[]]>,
  );

  return resolvedData;
}

export default getTopLists;
