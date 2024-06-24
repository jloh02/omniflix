import IReview from "./IReview";

interface IReviewWithMediaDetails extends IReview {
  mediaPoster: string;
  mediaTitle: string;
}

export default IReviewWithMediaDetails;
