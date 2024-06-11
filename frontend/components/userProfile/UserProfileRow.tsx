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
import React, { useState } from "react";
import {
  BIO_MAX_CHAR_LENGTH,
  NAME_MAX_CHAR_LENGTH,
  USERNAME_MAX_CHAR_LENGTH,
} from "@/utils/constants";

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
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const validateInput = (value: string) => {
    setError(null);

    // Input Validation for Name field
    if (label == "Name") {
      if (!value) {
        setError("Name is required.");
        return;
      }

      if (value.length > NAME_MAX_CHAR_LENGTH) {
        setError(`Name can only be ${NAME_MAX_CHAR_LENGTH} characters long.`);
        return;
      }
    }

    // Input Validation for Username field
    if (label == "Username") {
      if (!value) {
        setError("Username is required.");
        return;
      }

      if (value.length > USERNAME_MAX_CHAR_LENGTH) {
        setError(
          `Username can only be ${USERNAME_MAX_CHAR_LENGTH} characters long.`,
        );
        return;
      }

      if (/\s/.test(value)) {
        setError("Username cannot contain spaces.");
        return;
      }

      // TODO: Handle username must be unique
    }

    // Input Validation for Bio field
    if (label == "Bio") {
      if (value.length > BIO_MAX_CHAR_LENGTH) {
        setError(`Bio can only be ${BIO_MAX_CHAR_LENGTH} characters long.`);
        return;
      }
    }

    // Input Validation for Email field
    if (label == "Email") {
      if (!value) {
        setError("Email is required.");
        return;
      }

      // Check input contains exactly one @ symbol and at least one . symbol
      // and neither should be the first or last character
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setError("Please enter a valid email address.");
        return;
      }
    }
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessSnackbar(false);
  };

  const SuccessSnackbar = (
    <Snackbar
      open={openSuccessSnackbar}
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

  const ErrorSnackbar = (
    <Snackbar
      open={openErrorSnackbar}
      autoHideDuration={5000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity="error"
        sx={{ width: "100%" }}
      >
        <AlertTitle>Update failed!</AlertTitle>
        An error occurred. Please try again.
      </Alert>
    </Snackbar>
  );

  return (
    <>
      {isEditing ? (
        <Box width="100%" display="flex" alignItems="center" gap={1}>
          <TextField
            required
            type={label === "Email" ? "email" : "text"}
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
            disabled={Boolean(error)}
            onClick={() => {
              if (onUpdate(newValue)) {
                setOpenSuccessSnackbar(true);
                setIsEditing(!isEditing);
              } else {
                setOpenErrorSnackbar(true);
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
      {ErrorSnackbar}
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
  updateFunction: (newValue: string) => boolean;
}

const UserProfileRow: React.FC<UserProfileRowProps> = ({
  label,
  value,
  updateFunction,
}: UserProfileRowProps) => {
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
};

export default UserProfileRow;
