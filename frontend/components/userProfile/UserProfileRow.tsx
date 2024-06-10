"use client";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useState } from "react";

interface LabelProps {
  label: string;
}

const Label: React.FC<LabelProps> = ({ label }) => {
  return (
    <Box width="100px">
      <Typography>{label}</Typography>
    </Box>
  );
};

interface DefaultRowProps {
  value: string;
  onUpdate: (newValue: string) => void;
}

const DefaultRow: React.FC<DefaultRowProps> = ({ value, onUpdate }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>(value);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const SuccessSnackbar = (
    <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        <AlertTitle>Update successful!</AlertTitle>
        Please reload to see the changes.
      </Alert>
    </Snackbar>
  );

  return (
    <>
      {isEditing ? (
        <Box width="100%" display="flex" alignItems="center" gap={1}>
          <TextField
            required
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            size="small"
            fullWidth
            multiline
          />
          <Button
            variant="contained"
            onClick={() => {
              onUpdate(newValue);
              setIsEditing(!isEditing);
              setOpenSnackbar(true);
            }}
            sx={{
              color: "#0088cc !important",
            }}
          >
            Update
          </Button>
          <Button
            onClick={() => {
              setNewValue(value);
              setIsEditing(!isEditing);
            }}
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
      {SuccessSnackbar}
    </>
  );
};

const PasswordRow: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}>
      <Button
        sx={{
          color: "#0088cc !important",
        }}
      >
        Change Password
      </Button>
    </Box>
  );
};

interface UserProfileRowProps {
  label: string;
  value?: string;
  updateFunction: (newValue: string) => void;
}

export default function UserProfileRow({
  label,
  value,
  updateFunction,
}: UserProfileRowProps) {
  let valueRow;
  if (label === "Password") {
    valueRow = <PasswordRow />;
  } else {
    valueRow = <DefaultRow value={value || ""} onUpdate={updateFunction} />;
  }

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
        <Label label={label} />
        {valueRow}
      </Box>
      <Divider />
    </>
  );
}
