import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import coverImage from "./homepage-cover.jpg";
import { LOGIN_PAGE_ROUTE } from "@/utils/constants";

export default async function Index() {
  return (
    <>
      <Card
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
        }}
      >
        <CardMedia
          component="img"
          image={coverImage.src}
          sx={{ filter: "brightness(50%)" }}
        />
        <CardContent
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
              whiteSpace: "nowrap",
            }}
          >
            Welcome to Omniflix
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
              whiteSpace: "nowrap",
            }}
          >
            Your one stop platform to track and organize all the movies, shows,
            books and games you enjoy
          </Typography>
          <Button
            className="my-4"
            variant="contained"
            color="primary"
            href={LOGIN_PAGE_ROUTE}
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
