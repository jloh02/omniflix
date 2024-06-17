import { Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserPageTemplate from "@/components/userPages/UserPageTemplate";
import UserReviewCard from "@/components/reviews/UserReviewCard";
import { MediaType } from "@/utils/constants";
import getUserReviews from "@/utils/database/reviews/getUserReviews";
import IReviewWithMediaDetails from "@/utils/types/IReviewWithMediaDetails";

const UserReviews: React.FC = async () => {
  // const [reviews, setReviews] = useState<IReviewWithMediaDetails[]>([]);
  // const [error, setError] = useState<Error | null>(null);

  // useEffect(() => {
  //   const fetchUserReviews = () => {
  //     try {
  //       const fetchedReviews = getUserReviews();
  //       setReviews(fetchedReviews);
  //     } catch (error) {
  //       setError(error as Error);
  //     }
  //   };
  //   fetchUserReviews();
  // }, []);

  const reviews = await getUserReviews();

  return (
    <UserPageTemplate>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Reviews
      </Typography>
      {reviews.map((review) => (
        <UserReviewCard
          key={review.mediaId}
          mediaType={review.mediaType as MediaType}
          mediaId={review.mediaId}
          poster={review.mediaPoster}
          mediaTitle={review.mediaTitle}
          rating={review.rating}
          datetime={review.createdAt}
          reviewTitle={review.title}
          reviewDescription={review.description}
        />
      ))}
    </UserPageTemplate>
  );
};

export default UserReviews;
