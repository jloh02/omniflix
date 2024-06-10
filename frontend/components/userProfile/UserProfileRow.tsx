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
  label: string;
  value: string;
  onUpdate: (newValue: string) => boolean;
}

const DefaultRow: React.FC<DefaultRowProps> = ({ label, value, onUpdate }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>(value);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validateInput = (value: string) => {
    if (label === "Username") {
      // Add your validation logic here. For example:
      const isValid = /^[a-zA-Z0-9]+$/.test(value);
      setError(
        isValid ? null : "Username can only contain letters and numbers.",
      );
    }
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const SuccessSnackbar = (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={5000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity="success"
        sx={{ width: "100%" }}
      >
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
            onChange={(e) => {
              setNewValue(e.target.value);
              validateInput(e.target.value);
            }}
            error={Boolean(error)}
            helperText={error}
            size="small"
            fullWidth
            multiline={label === "Bio"}
          />
          <Button
            variant="contained"
            onClick={() => {
              if (onUpdate(newValue)) {
                setOpenSnackbar(true);
                setIsEditing(!isEditing);
              }
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
    valueRow = (
      <DefaultRow label={label} value={value || ""} onUpdate={updateFunction} />
    );
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
