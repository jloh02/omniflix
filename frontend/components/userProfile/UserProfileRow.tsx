"use client";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useState } from "react";

interface UserProfileRowProps {
  name: string;
  value: string;
}

export default function UserProfileRow({ name, value }: UserProfileRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedValue, setUpdatedValue] = useState(value);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          padding: 1,
        }}
      >
        <Box width="100px">
          <Typography>{name}</Typography>
        </Box>
        {isEditing ? (
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              required
              value={updatedValue}
              onChange={(e) => setUpdatedValue(e.target.value)}
              size="small"
            />
            <Button
              variant="contained"
              onClick={() => setIsEditing(!isEditing)}
              sx={{
                color: "#0088cc !important",
              }}
            >
              Update
            </Button>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              sx={{
                color: "#0088cc !important",
              }}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <>
            <Typography sx={{ flexGrow: 1 }}>{value}</Typography>
            <Button
              endIcon={<Edit />}
              onClick={() => setIsEditing(!isEditing)}
              sx={{
                color: "#0088cc !important",
              }}
            >
              Edit
            </Button>
          </>
        )}
      </Box>
      <Divider />
    </>
  );
}
