import { Box, Typography } from "@mui/material";
import React from "react";

const Index: React.FC = async () => {
  return (
    <Box sx={{ width: "90%", padding: "10px" }}>
      <Typography align="left" variant="h4">
        Dashboard
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>Page in development.</Typography>
    </Box>
  );
};

export default Index;
