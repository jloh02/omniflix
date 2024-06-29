import { MediaType } from "@/utils/constants";
import OmdbPageDetails from "@/components/omdbPage/omdbPageDetails";

interface MoviePageProps {
  params: {
    mediaId: string;
  };
}

const Movie: React.FC<MoviePageProps> = ({ params }) => {
  return (
    <OmdbPageDetails
      mediaId={parseInt(params.mediaId)}
      mediaType={MediaType.MOVIE}
      errorHeader="Movie Not Found"
      errorBody="The movie you're looking for could not be found."
    />
  );
};

export default Movie;
