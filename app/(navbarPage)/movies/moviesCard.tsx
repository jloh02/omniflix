import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IMovie from "@/utils/types/IMovie";
import addToFavorites from "@/utils/addToFavorites";
import isFavorited from "@/utils/isFavorited";
import removeFromFavorites from "@/utils/removeFromFavorites";

interface MovieCardProps {
  movie: IMovie;
}

const FavoriteButton: React.FC<{ mediaType: string; mediaId: string }> = ({
  mediaType,
  mediaId,
}) => {
  const [hover, setHover] = React.useState(false);
  const [isFavoritedState, setIsFavoritedState] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const checkIsFavorited = async () => {
      const favorited = await isFavorited(mediaType, mediaId);
      setIsFavoritedState(favorited ?? false);
    };

    checkIsFavorited();
  }, [mediaType, mediaId]);

  return (
    <IconButton
      onClick={async () => {
        if (isFavoritedState) {
          await removeFromFavorites(mediaType, mediaId);
          setIsFavoritedState(false);
        } else {
          await addToFavorites(mediaType, mediaId);
          setIsFavoritedState(true);
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{ color: "yellow" }}
    >
      {isFavoritedState || hover ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  );
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card className="relative w-48 h-full">
      <CardMedia component="img" image={movie.poster} className="h-72" />
      <FavoriteButton mediaType="movie" mediaId={movie.imdbID} />
      <CardContent className="p-2.5 pb-2.5">
        <Typography variant="body1">{movie.title}</Typography>
        <Typography variant="body2">{movie.year}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
