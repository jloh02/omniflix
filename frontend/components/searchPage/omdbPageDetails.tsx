"use client";

import { MediaType, MediaTypeToParam, OMDBType } from "@/utils/constants";
import SearchDetails from "./searchDetails";
import getOmdbDetails from "@/utils/database/omdb/omdbDetails";

interface MoviePageProps {
  mediaId: number;
  mediaType: MediaType;
  errorHeader: string;
  errorBody: string;
}

const OmdbPageDetails: React.FC<MoviePageProps> = (props) => {
  return (
    <SearchDetails
      {...props}
      getDetails={async (mediaId: number, mediaType: MediaType) => {
        const { omdbType } = MediaTypeToParam[mediaType];
        return (await getOmdbDetails(mediaId, omdbType as OMDBType)) ?? null;
      }}
    />
  );
};

export default OmdbPageDetails;
