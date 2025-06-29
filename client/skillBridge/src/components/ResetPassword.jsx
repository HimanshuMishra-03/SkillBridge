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

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

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
      <Box maxWidth={400} mx="auto" px={2}>
        <Typography
          variant="h5"
          mb={2}
          sx={{ color: "#00bcd4", textAlign: "center", fontWeight: "bold" }}
        >
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            name="password"
            type="password"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            InputProps={{ sx: { color: "#fff" } }}
            InputLabelProps={{ sx: { color: "#aaa" } }}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            InputProps={{ sx: { color: "#fff" } }}
            InputLabelProps={{ sx: { color: "#aaa" } }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#00bcd4",
              color: "#0d1b2a",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#00acc1" },
            }}
          >
            Reset Password
          </Button>
        </form>

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
