import React from "react";
import IMovie from "@/utils/types/IMovie";
import { MediaType } from "@/utils/constants";
import MediaCard from "./MediaCard";

type MovieCardProps = {
  movie: IMovie;
  showLabel?: boolean;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, showLabel = true }) => {
  return (
    <MediaCard
      mediaType={MediaType.MOVIE}
      mediaId={movie.mediaId}
      posterUrl={movie.posterUrl}
      title={movie.title}
      subtitle={movie.year}
      showLabel={showLabel}
    />
  );
};

export default MovieCard;
