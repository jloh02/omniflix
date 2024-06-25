import UserInfoHeader from "@/components/userPages/UserInfoHeader";
import getUserInfo from "@/utils/database/userProfile/getUserInfo";
import { Box, Button, Typography } from "@mui/material";

interface UserProfilePageProps {
  params: {
    username: string;
  };
}

const ErrorPage = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "30vh",
    }}
  >
    <Typography variant="h4" component="h1" gutterBottom>
      User Not Found
    </Typography>
    <Typography variant="body1" component="p" gutterBottom>
      The user you're looking for could not be found.
    </Typography>
    <Button variant="contained" color="primary" href="/" sx={{ margin: 1 }}>
      Return to homepage
    </Button>
  </Box>
);

const UserProfilePage: React.FC<UserProfilePageProps> = async ({ params }) => {
  // Fetch user info
  let response;
  try {
    response = await getUserInfo(params.username);
  } catch (e) {
    return <Typography>{(e as Error).message}</Typography>;
  }

  if (!response) {
    return <ErrorPage />;
  }

  const { data, error } = response;

  if (!data || error) {
    return <ErrorPage />;
  }

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <UserInfoHeader
        name={data.name}
        username={data.username}
        bio={data.bio ?? ""}
      />
    </Box>
  );
};

export default UserProfilePage;
