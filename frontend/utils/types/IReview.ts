interface IReview {
  createdAt: string;
  userId: string;
  username: string;
  mediaType: string;
  mediaId: number;
  rating: number;
  title: string;
  description: string;
}

export default IReview;
