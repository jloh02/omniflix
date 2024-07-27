import React from "react";
import { MediaType } from "@/utils/constants";
import OmdbSearchPage from "@/components/searchPage/omdbSearchPage";

const TVSeries: React.FC = () => {
  return <OmdbSearchPage title="TV Series" type={MediaType.TV_SERIES} />;
};

export default TVSeries;
