import { Box, Typography } from "@mui/material";

interface InfoSummaryHeaderProps {
  movieId: string;
}

const InfoSummaryHeader: React.FC<InfoSummaryHeaderProps> = ({ movieId }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "30vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(45deg, #003366 30%, #002347 90%)",
      }}
    >
      <Typography variant="h4">{movieId}</Typography>
    </Box>
  );
};

export default InfoSummaryHeader;
