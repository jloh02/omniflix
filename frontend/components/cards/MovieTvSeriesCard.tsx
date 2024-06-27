import React from "react";
import IMovieTvSeries from "@/utils/types/IMovieTvSeries";
import { MediaType } from "@/utils/constants";
import MediaCard from "./MediaCard";

type MovieTvSeriesCardProps = {
  media: IMovieTvSeries;
  type: MediaType;
  showLabel?: boolean;
};

const MovieTvSeriesCard: React.FC<MovieTvSeriesCardProps> = ({
  media,
  type,
  showLabel = true,
}) => {
  return (
    <MediaCard
      mediaType={type}
      mediaId={media.mediaId}
      posterUrl={media.posterUrl}
      title={media.title}
      subtitle={media.year}
      showLabel={showLabel}
    />
  );
};

export default MovieTvSeriesCard;
