"use server";

import { createClient } from "@/utils/supabase/server";
import { MediaType, MediaTypeToParam, TableNames } from "../../constants";
import { TablesInsert } from "@/utils/supabase/types.gen";
import IReviewWithMediaDetails from "@/utils/types/IReviewWithMediaDetails";

/* Note about cached values:
The reviews table has a media_id column that references the id of the media in the cache tables.
This is done to avoid storing the same media information multiple times in the reviews table.
This method will query each table with a join, then unify the cache values into the relevant fields
in the reviewWithDetailsToUnifiedCache method.

When updating with new caches add the following:
1. Update TableNames constants (Should already be done with other things)
2. Add relevant table name and structure in ReviewWithDetails interface below
3. Update the select command in getUserReviews to include the new cache table
*/

export interface ReviewWithDetails extends TablesInsert<TableNames.REVIEWS> {
  users_info: { username: string };
  media: {
    media_type: MediaType;
    [TableNames.MOVIES_CACHE]: { title: string; poster_url: string }[];
    [TableNames.TV_SERIES_CACHE]: { title: string; poster_url: string }[];
    [TableNames.BOOKS_CACHE_TABLE]: { title: string; image_link: string }[];
  };
}

interface ReviewWithUnifiedCache extends ReviewWithDetails {
  mediaTitle: string;
  mediaPoster: string;
}

const reviewWithDetailsToUnifiedCache = (
  review: ReviewWithDetails,
): ReviewWithUnifiedCache => {
  const { tableName: cacheTableName } =
    MediaTypeToParam[review.media.media_type];

  if (!cacheTableName)
    throw Error(
      `Invalid media type ${review.media} produced ${cacheTableName}`,
    );

  const cacheTableNameKey = cacheTableName as keyof Omit<
    typeof review.media,
    "media_type"
  >;

  const imageKeyName = (
    cacheTableName === TableNames.BOOKS_CACHE_TABLE
      ? "image_link"
      : "poster_url"
  ) as keyof (typeof review.media)[typeof cacheTableNameKey][0];

  return {
    ...review,
    mediaTitle: review.media[cacheTableNameKey][0].title,
    mediaPoster: review.media[cacheTableNameKey][0][imageKeyName],
  };
};

async function getUserReviews(): Promise<IReviewWithMediaDetails[]> {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, throw an error
  if (!user) {
    throw new Error("Please login again.");
  }

  // Fetch reviews
  const { data, error } = await supabase
    .from(TableNames.REVIEWS)
    // Query does not use inner join because each cache can be null, but never all
    .select(
      `
      *,
      ${TableNames.USERS_INFO}:user_id (
        username
      ),
      ${TableNames.MEDIA}:media_id (     
        media_type,   
        ${TableNames.MOVIES_CACHE} (
          title,
          poster_url
        ),
        ${TableNames.TV_SERIES_CACHE} (
          title,
          poster_url
        ),
        ${TableNames.BOOKS_CACHE_TABLE} (
          title,
          image_link
        )
      )
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return (
    data
      // Convert separated cached to unified cache values
      .map(reviewWithDetailsToUnifiedCache)
      // Return as a renderable review
      .map(
        (review: ReviewWithUnifiedCache): IReviewWithMediaDetails => ({
          createdAt: new Date(review.created_at ?? "").toLocaleString(
            undefined,
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            },
          ),
          userId: review.user_id ?? "",
          username: review.users_info.username,
          mediaType: review.media.media_type,
          mediaId: review.media_id,
          mediaTitle: review.mediaTitle,
          mediaPoster: review.mediaPoster,
          rating: review.rating,
          title: review.title,
          description: review.description,
        }),
      )
  );
}

export default getUserReviews;
