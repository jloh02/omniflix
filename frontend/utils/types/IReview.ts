interface IReview {
  createdAt: string;
  userId: string;
  username: string;
  mediaType: string;
  mediaId: string;
  rating: number;
  title: string;
  description: string;
}

export default IReview;
