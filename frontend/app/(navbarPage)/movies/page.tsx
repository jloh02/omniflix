import React from "react";
import { MediaType } from "@/utils/constants";
import OmdbSearchPage from "@/components/searchPage/omdbSearchPage";

const Movies: React.FC = () => {
  return <OmdbSearchPage title="Movies" type={MediaType.MOVIE} />;
};

export default Movies;
