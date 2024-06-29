import React from "react";
import { MediaType } from "@/utils/constants";
import OmdbPage from "@/components/omdbPage/omdbPage";

const Movies: React.FC = () => {
  return <OmdbPage title="Movies" type={MediaType.MOVIE} />;
};

export default Movies;
