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
  PASSWORD_MIN_CHAR_LENGTH,
  USERNAME_MAX_CHAR_LENGTH,
} from "@/utils/constants";
import { AuthResponse } from "@/utils/supabase/auth";

interface LabelProps {
  label: string;
}

const Label: React.FC<LabelProps> = ({ label }) => {
  return (
    <Box minWidth="100px">
      <Typography>{label}</Typography>
    </Box>
  );
};

const DefaultRow: React.FC<UserProfileRowProps> = ({
  label,
  value,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>(value);
  const [error, setError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
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
    setOpenErrorSnackbar(false);
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

  const ErrorSnackbar = (errorMessage: string) => {
    return (
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
          {errorMessage}
        </Alert>
      </Snackbar>
    );
  };

  return (
    <>
      {isEditing ? (
        <Box width="100%" display="flex" alignItems="center" gap={1}>
          <TextField
            required
            color="secondary"
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
            // variant="contained"
            color="info"
            disabled={Boolean(error)}
            onClick={async () => {
              const { error } = await onUpdate(newValue);
              if (error) {
                setUpdateError(error);
                setOpenErrorSnackbar(true);
              } else {
                setOpenSuccessSnackbar(true);
                setIsEditing(!isEditing);
              }
            }}
          >
            Update
          </Button>
          <Button
            color="info"
            onClick={() => {
              setNewValue(value);
              setError(null);
              setIsEditing(!isEditing);
            }}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <>
          <Typography sx={{ flexGrow: 1 }}>{newValue}</Typography>
          <Button
            color="info"
            endIcon={<Edit />}
            onClick={() => setIsEditing(!isEditing)}
          >
            Edit
          </Button>
        </>
      )}
      {SuccessSnackbar}
      {updateError && ErrorSnackbar(updateError)}
    </>
  );
};

const PasswordRow: React.FC<UserProfileRowProps> = ({
  label,
  value,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string | null>(null);
  const [confirmValue, setConfirmValue] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const validatePasswordInput = (value: string) => {
    setPasswordError(null);

    if (value.length < PASSWORD_MIN_CHAR_LENGTH) {
      setPasswordError(
        `Password must be at least ${PASSWORD_MIN_CHAR_LENGTH} characters long.`,
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
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
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

  const ErrorSnackbar = (errorMessage: string) => {
    return (
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
          {errorMessage}
        </Alert>
      </Snackbar>
    );
  };

  return (
    <>
      {isEditing ? (
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="start"
          padding={1}
          gap={2}
        >
          <TextField
            required
            color="secondary"
            label="New Password"
            type="password"
            value={newValue}
            onChange={(e) => {
              setNewValue(e.target.value);
              validatePasswordInput(e.target.value);
            }}
            error={Boolean(passwordError)}
            helperText={passwordError}
            size="small"
          />
          <TextField
            required
            color="secondary"
            label="Confirm New Password"
            type="password"
            value={confirmValue}
            onChange={(e) => {
              setConfirmValue(e.target.value);
              if (e.target.value !== newValue) {
                setConfirmError("Passwords do not match");
              } else {
                setConfirmError("");
              }
            }}
            error={Boolean(confirmError)}
            helperText={confirmError}
            size="small"
          />
          <Box>
            <Button
              // variant="contained"
              color="info"
              disabled={Boolean(passwordError) || Boolean(confirmError)}
              onClick={async () => {
                const { error } = await onUpdate(newValue || "");
                if (error) {
                  setUpdateError(error);
                  setOpenErrorSnackbar(true);
                } else {
                  setOpenSuccessSnackbar(true);
                  setIsEditing(!isEditing);
                }
              }}
            >
              Update
            </Button>
            <Button
              color="info"
              onClick={() => {
                setNewValue(value);
                setConfirmValue(value);
                setPasswordError(null);
                setConfirmError(null);
                setIsEditing(!isEditing);
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
        >
          <Button color="info" onClick={() => setIsEditing(!isEditing)}>
            Change Password
          </Button>
        </Box>
      )}
      {SuccessSnackbar}
      {updateError && ErrorSnackbar(updateError)}
    </>
  );
};

interface UserProfileRowProps {
  label: string;
  value: string;
  onUpdate: (newValue: string) => Promise<AuthResponse>;
}

const UserProfileRow: React.FC<UserProfileRowProps> = ({
  label,
  value,
  onUpdate: updateFunction,
}: UserProfileRowProps) => {
  let valueRow;
  if (label === "Password") {
    valueRow = (
      <PasswordRow label={label} value={value} onUpdate={updateFunction} />
    );
  } else {
    valueRow = (
      <DefaultRow label={label} value={value} onUpdate={updateFunction} />
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
