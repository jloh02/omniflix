"use server";

import { createClient } from "@/utils/supabase/server";
import { MediaType, TableNames } from "../../constants";
import { TablesInsert } from "@/utils/supabase/types.gen";
import IReviewWithMediaDetails from "@/utils/types/IReviewWithMediaDetails";

export interface ReviewWithMovieDetails
  extends TablesInsert<TableNames.REVIEWS> {
  users_info: { username: string };
  media: {
    media_type: MediaType;
    movies: { title: string; poster_url: string }[];
  };
}

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
  const query = supabase.from(TableNames.REVIEWS).select(
    `
      *,
      ${TableNames.USERS_INFO}:user_id (
        username
      ),
      ${TableNames.MEDIA}:media_id (     
        media_type,   
        ${TableNames.MOVIES_CACHE}!inner (
          title,
          poster_url
        )
      )
    `,
  );

  const { data, error } = await query
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data.map(
    (review: ReviewWithMovieDetails): IReviewWithMediaDetails => ({
      createdAt: new Date(review.created_at ?? "").toLocaleString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      userId: review.user_id ?? "",
      username: review.users_info.username,
      mediaType: review.media.media_type,
      mediaId: review.media_id,
      mediaTitle: review.media.movies[0].title,
      mediaPoster: review.media.movies[0].poster_url,
      rating: review.rating,
      title: review.title,
      description: review.description,
    }),
  );
}

export default getUserReviews;
