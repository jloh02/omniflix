"use server";

import { createClient } from "@/utils/supabase/server";
import { MediaType, TableNames } from "../../constants";
import { TablesInsert } from "@/utils/supabase/types.gen";
import IReview from "@/utils/types/IReview";

export interface ReviewWithUserInfo extends TablesInsert<TableNames.REVIEWS> {
  users_info: { username: string };
}

async function getReviews(
  mediaType: MediaType,
  mediaId: string,
): Promise<IReview[]> {
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
      )
    `,
    )
    .eq("media_type", mediaType)
    .eq("media_id", mediaId)
    .order("created_at", { ascending: false })
    .returns<ReviewWithUserInfo[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data.map(
    (review: ReviewWithUserInfo): IReview => ({
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
      mediaType: mediaType,
      mediaId: mediaId,
      rating: review.rating,
      title: review.title,
      description: review.description,
    }),
  );
}

export default getReviews;
