import { Typography } from "@mui/material";
import React from "react";
import UserPageTemplate from "@/components/userPages/UserPageTemplate";
import UserReviewCard from "@/components/reviews/UserReviewCard";
import { MediaType } from "@/utils/constants";
import getUserReviews from "@/utils/database/reviews/getUserReviews";
import IReviewWithMediaDetails from "@/utils/types/IReviewWithMediaDetails";

const UserReviews: React.FC = async () => {
  let reviews: IReviewWithMediaDetails[] = [];
  let reviewsSection;

  try {
    reviews = await getUserReviews();
  } catch (error) {
    reviewsSection = (
      <Typography>
        An error occurred while fetching reviews.
        {(error as Error).toString()}
      </Typography>
    );
  }

  if (reviews.length === 0) {
    reviewsSection = <Typography>No reviews found.</Typography>;
  } else {
    reviewsSection = reviews.map((review) => (
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
    ));
  }

  return (
    <UserPageTemplate>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Reviews
      </Typography>
      {reviewsSection}
    </UserPageTemplate>
  );
};

export default UserReviews;
