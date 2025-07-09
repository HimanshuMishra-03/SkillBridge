import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import FullScreenLayout from "./FullScreeLayout.jsx";
import API_BASE_URL from "../config/api.js";
import daylightTheme from "../theme";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const { colors } = daylightTheme;

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match.",
        severity: "error",
      });
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/resetPass`, {
        token,
        password: formData.password,
      });

      setSnackbar({
        open: true,
        message: response.data.message || "Password reset successful!",
        severity: "success",
      });

      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setSnackbar({
        open: true,
        message:
          err.response?.data?.message ||
          "Password reset failed. Try again.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <FullScreenLayout>
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{
          alignSelf: "flex-start",
          mb: 1,
          color: colors.accent,
          borderColor: colors.primary,
          textTransform: "none",
          "&:hover": {
            borderColor: colors.primaryDark,
            color: colors.primary,
          },
          
        }}
      >
        ← Back
      </Button>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          backgroundColor: colors.card,
          padding: 4,
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
            xs: "40vh",
            sm: "30vh",
            md: "25vh",
            lg: "40vh",
          },
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          color={colors.primary}
        >
          Reset Password
        </Typography>

        <TextField
          label="New Password"
          name="password"
          type="password"
          fullWidth
          required
          value={formData.password}
          onChange={handleChange}
          variant="filled"
          InputProps={{ style: { color: colors.textInput } }}
          InputLabelProps={{ style: { color: colors.textLabel } }}
          sx={{ backgroundColor: colors.inputBackground, borderRadius: 1 }}
        />

        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          fullWidth
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          variant="filled"
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
          Reset Password
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

export default ResetPassword;
