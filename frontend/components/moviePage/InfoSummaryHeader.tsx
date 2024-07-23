import IMovieTvSeriesDetails from "@/utils/types/IMovieTvSeriesDetails";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import FavoriteButton from "../cards/FavoriteButton";
import { MediaType } from "@/utils/constants";
import AddToWatchlistButton from "../cards/AddToWatchlistButton";
import LikeDislikeButtons from "../cards/LikeDislikeButtons";
import { OpenInNew, StarOutlined } from "@mui/icons-material";
import ShareButton from "../socialShare/ShareButton";
import IBook, { isBook } from "@/utils/types/IBook";

interface ButtonsRowProps {
  mediaType: MediaType;
  mediaId: number;
  mediaTitle: string;
}

const ButtonsRow: React.FC<ButtonsRowProps> = ({
  mediaType,
  mediaId,
  mediaTitle,
}) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <FavoriteButton mediaType={mediaType} mediaId={mediaId} />
      <AddToWatchlistButton mediaType={mediaType} mediaId={mediaId} />
      <LikeDislikeButtons mediaType={mediaType} mediaId={mediaId} />
      <ShareButton text={`Check out ${mediaTitle} on Omniflix!`} />
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
  media: IMovieTvSeriesDetails | IBook;
  mediaType: MediaType;
}

const InfoSummaryHeader: React.FC<InfoSummaryHeaderProps> = ({
  media,
  mediaType,
}) => {
  if (isBook(media)) {
    const ISBN = media.data.volume_info.industry_identifiers.filter(
      (ii) => ii["type"] === "ISBN_13",
    )[0]?.identifier;
    return (
      <Box
        margin={2}
        padding={2}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        borderRadius={4}
        sx={{ background: "#002347" }}
      >
        <Box display="flex" alignItems="start" position="relative">
          {media.data.volume_info.preview_link && (
            <Button
              color="info"
              href={media.data.volume_info.preview_link}
              target="_blank"
              sx={{ position: "absolute", right: 0, top: 0 }}
            >
              Google Books <OpenInNew />
            </Button>
          )}
          <CardMedia
            component="img"
            image={media.imageLink}
            alt={media.title}
            sx={{ height: "30vh", width: "auto", objectFit: "contain", mr: 2 }}
          />
          <Box flex={1}>
            <Typography variant="h6">{media.title}</Typography>
            {media.data.volume_info.subtitle && (
              <Typography variant="body1">
                {media.data.volume_info.subtitle}
              </Typography>
            )}
            <Typography variant="body1" color="text.secondary">
              {media.publishedDate} · {media.data.volume_info.page_count} pages{" "}
              {ISBN ? ` · ISBN: ${ISBN}` : ""}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {media.data.volume_info.categories.join(", ")}
            </Typography>

            <ButtonsRow
              mediaType={mediaType}
              mediaId={media.mediaId}
              mediaTitle={media.title}
            />
          </Box>
        </Box>
        <Typography variant="body2" align="justify" marginTop={1}>
          {media.data.volume_info.description}
        </Typography>
      </Box>
    );
  } else {
    return (
      <Box
        margin={2}
        padding={2}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        borderRadius={4}
        sx={{ background: "#002347" }}
      >
        <Box display="flex" alignItems="start">
          <CardMedia
            component="img"
            image={media.posterUrl}
            alt={media.title}
            sx={{ height: "30vh", width: "auto", objectFit: "contain", mr: 2 }}
          />
          <Box flex={1}>
            <Typography variant="h6">{media.title}</Typography>
            <Typography variant="body1" color="text.secondary">
              {media.rated} · {media.released} · {media.runtime} mins
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {media.genre.join(", ")}
            </Typography>
            <RatingsRow imdbRating={media.imdbRating} />
            <ButtonsRow
              mediaType={mediaType}
              mediaId={media.mediaId}
              mediaTitle={media.title}
            />
          </Box>
        </Box>
        <Typography variant="body2" align="justify" marginTop={1}>
          {media.data.plot}
        </Typography>
      </Box>
    );
  }
};

export default InfoSummaryHeader;
