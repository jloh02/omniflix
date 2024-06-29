import React from "react";
import { MediaType } from "@/utils/constants";
import OmdbPage from "@/components/omdbPage/omdbPage";

const TVSeries: React.FC = () => {
  return <OmdbPage title="TV Series" type={MediaType.TV_SERIES} />;
};

export default TVSeries;
