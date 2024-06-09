import IMovieDetails from "@/utils/types/IMovieDetails";
import { Box, CardMedia, Typography } from "@mui/material";
import FavoriteButton from "../cards/FavoriteButton";
import { MediaType } from "@/utils/constants";
import AddToWatchlistButton from "../cards/AddToWatchlistButton";
import LikeDislikeButtons from "../cards/LikeDislikeButtons";
import { StarOutlined } from "@mui/icons-material";

interface ButtonsRowProps {
  mediaType: MediaType;
  mediaId: string;
}

const ButtonsRow: React.FC<ButtonsRowProps> = ({ mediaType, mediaId }) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <FavoriteButton mediaType={mediaType} mediaId={mediaId} />
      <AddToWatchlistButton mediaType={mediaType} mediaId={mediaId} />
      <LikeDislikeButtons mediaType={mediaType} mediaId={mediaId} />
    </Box>
  );
};

interface RatingsRowProps {
  imdbRating: string;
}

const RatingsRow: React.FC<RatingsRowProps> = ({ imdbRating }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="start" marginTop={1}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="body2" align="center" color="text.secondary">
          IMDb Rating
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <StarOutlined sx={{ color: "gold" }} />
          <Typography variant="h6">
            {imdbRating}{" "}
            <Typography variant="h6" color="text.secondary" component="span">
              / 10
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

interface InfoSummaryHeaderProps {
  movie: IMovieDetails;
}

const InfoSummaryHeader: React.FC<InfoSummaryHeaderProps> = ({ movie }) => {
  return (
    <Box
      margin={2}
      display="flex"
      justifyContent="center"
      borderRadius={4}
      sx={{ background: "#002347" }}
    >
      <Box display="flex" alignItems="start" margin={2}>
        <CardMedia
          component="img"
          image={movie.poster}
          alt={movie.title}
          sx={{ height: "35vh", width: "auto", objectFit: "contain", mr: 2 }}
        />
        <Box flex={1}>
          <Typography variant="h6">{movie.title}</Typography>
          <Typography variant="body1" color="text.secondary">
            {movie.rated} · {movie.released} · {movie.runtime}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {movie.genre}
          </Typography>
          <RatingsRow imdbRating={movie.imdbRating} />
          <ButtonsRow mediaType={MediaType.MOVIE} mediaId={movie.imdbID} />
          <Typography variant="body2">{movie.plot}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoSummaryHeader;
