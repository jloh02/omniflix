import { Box, Button, Divider, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";

interface UserProfileRowProps {
  name: string;
  value: string;
}

export default function UserProfileRow({ name, value }: UserProfileRowProps) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
        }}
      >
        <Box sx={{ width: 110 }}>
          <Typography>{name}</Typography>
        </Box>
        <Typography sx={{ flexGrow: 1 }}>{value}</Typography>
        <Button
          endIcon={<Edit />}
          sx={{
            color: "#0088cc !important",
          }}
        >
          Edit
        </Button>
      </Box>
      <Divider />
    </>
  );
}
