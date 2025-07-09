import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import API_BASE_URL from "../config/api";
import FullScreenLayout from "./FullScreeLayout.jsx";
import daylightTheme from "../theme";

function ForgotPassword() {
  const [identifier, setIdentifier] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { colors } = daylightTheme;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/forgotPass`, {
        identifier,
      });
      setSnackbar({
        open: true,
        message: response.data.message || "Reset link sent to your email!",
        severity: "success",
      });
      setIdentifier("");
    } catch (err) {
      setSnackbar({
        open: true,
        message:
          err.response?.data?.message ||
          "Failed to send reset link. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <FullScreenLayout>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          backgroundColor: colors.card,
          p: 4,
          borderRadius: 2,
          boxShadow: "0 0 15px rgba(0,0,0,0.6)",
          marginLeft: {
            xs: "2vw",
            sm: "18vw",
            md: "25vw",
            lg: "27vw",
          },
          width: {
            xs: "70vw",
            sm: "50vw",
            md: "40vw",
            lg: "27vw",
          },
          height: {
            xs: "25vh",
            sm: "20vh",
            md: "20vh",
            lg: "27vh",
          },
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          color={colors.primary}
        >
          Forgot Password
        </Typography>

        <TextField
          label="Email or Username"
          fullWidth
          required
          variant="filled"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          InputProps={{ style: { color: colors.textInput } }}
          InputLabelProps={{ style: { color: colors.textLabel } }}
          sx={{ backgroundColor: colors.inputBackground, borderRadius: 1 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{
            backgroundColor: colors.primary,
            color: colors.buttonText,
            fontWeight: "bold",
            "&:hover": { backgroundColor: colors.primaryDark },
          }}
        >
          Send Reset Link
        </Button>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </FullScreenLayout>
  );
}

export default ForgotPassword;
