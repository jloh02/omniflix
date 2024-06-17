"use server";

import { createClient } from "@/utils/supabase/server";
import { MediaType, TableNames } from "../../constants";
import { TablesInsert } from "@/utils/supabase/types.gen";
import IReview from "@/utils/types/IReview";
import IReviewWithMediaDetails from "@/utils/types/IReviewWithMediaDetails";

export interface ReviewWithMovieDetails
  extends TablesInsert<TableNames.REVIEWS> {
  users_info: { username: string };
  movies: { title: string; poster_url: string };
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
  const { data, error } = await supabase
    .from(TableNames.REVIEWS)
    .select(
      `
      *,
      users_info:user_id (
        username
      ),
      movies (
        title,
        poster_url
      )
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .returns<ReviewWithMovieDetails[]>();

  console.log(data);

  if (error) {
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
      mediaType: review.media_type,
      mediaId: review.media_id,
      mediaTitle: review.movies.title,
      mediaPoster: review.movies.poster_url,
      rating: review.rating,
      title: review.title,
      description: review.description,
    }),
  );
}

export default getUserReviews;
