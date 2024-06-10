"use client";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useState } from "react";

const PasswordRow: React.FC = () => {
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
          <Typography>Password</Typography>
        </Box>
        <Box
          sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
        >
          <Button
            sx={{
              color: "#0088cc !important",
            }}
          >
            Change Password
          </Button>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

interface UserProfileRowProps {
  label: string;
  value: string;
}

export default function UserProfileRow({ label, value }: UserProfileRowProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>(value);

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
          <Typography>{label}</Typography>
        </Box>
        {isEditing ? (
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              required
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
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
            <Typography sx={{ flexGrow: 1 }}>{newValue}</Typography>
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
