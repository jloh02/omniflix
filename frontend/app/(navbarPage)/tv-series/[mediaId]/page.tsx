import { MediaType } from "@/utils/constants";
import OmdbPageDetails from "@/components/omdbPage/omdbPageDetails";

interface MoviePageProps {
  params: {
    mediaId: string;
  };
}

const TvSeries: React.FC<MoviePageProps> = ({ params }) => {
  return (
    <OmdbPageDetails
      mediaId={parseInt(params.mediaId)}
      mediaType={MediaType.TV_SERIES}
      errorHeader="TV Series Not Found"
      errorBody="The series you're looking for could not be found."
    />
  );
};

export default TvSeries;
