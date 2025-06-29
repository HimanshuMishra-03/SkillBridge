import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import API_BASE_URL from "../config/api";

function RegistrationForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const initialRole =
    searchParams.get("role")?.toUpperCase() === "FREELANCER"
      ? "FREELANCER"
      : "CLIENT";

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: initialRole,
    companyName: "",
    bio: "",
    skills: "",
  });

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        ...(formData.role === "CLIENT" && {
          companyName: formData.companyName,
        }),
        ...(formData.role === "FREELANCER" && {
          bio: formData.bio,
          skills: formData.skills.split(",").map((skill) => skill.trim()),
        }),
      };

      const res = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        payload
      );

      setMessage(res.data.message || "User registered successfully!");
      setSeverity("success");
      setOpen(true);

      setFormData({
        username: "",
        email: "",
        password: "",
        role: initialRole,
        companyName: "",
        bio: "",
        skills: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.errorMessage || "Error registering user");
      setSeverity("error");
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#0d1b2a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        maxWidth={500}
        width="100%"
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          backgroundColor: "#142a4c",
          borderRadius: 2,
          p: 4,
          boxShadow: "0 0 15px rgba(0,0,0,0.6)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          color="#00bcd4"
        >
          Register
        </Typography>

        {/* Role Select */}
        <TextField
          select
          label="Registering as"
          name="role"
          value={formData.role}
          onChange={handleChange}
          fullWidth
          variant="filled"
          InputProps={{ style: { color: "#e0f7fa" } }}
          InputLabelProps={{ style: { color: "#80deea" } }}
          sx={{ backgroundColor: "#0d1b2a", borderRadius: 1 }}
        >
          <MenuItem value="CLIENT" sx={{ color: "#00bcd4" }}>
            Client
          </MenuItem>
          <MenuItem value="FREELANCER" sx={{ color: "#00bcd4" }}>
            Freelancer
          </MenuItem>
        </TextField>

        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          fullWidth
          variant="filled"
          InputProps={{ style: { color: "#e0f7fa" } }}
          InputLabelProps={{ style: { color: "#80deea" } }}
          sx={{ backgroundColor: "#0d1b2a", borderRadius: 1 }}
        />

        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          variant="filled"
          InputProps={{ style: { color: "#e0f7fa" } }}
          InputLabelProps={{ style: { color: "#80deea" } }}
          sx={{ backgroundColor: "#0d1b2a", borderRadius: 1 }}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
          variant="filled"
          InputProps={{ style: { color: "#e0f7fa" } }}
          InputLabelProps={{ style: { color: "#80deea" } }}
          sx={{ backgroundColor: "#0d1b2a", borderRadius: 1 }}
        />

        {formData.role === "CLIENT" && (
          <TextField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            fullWidth
            variant="filled"
            InputProps={{ style: { color: "#e0f7fa" } }}
            InputLabelProps={{ style: { color: "#80deea" } }}
            sx={{ backgroundColor: "#0d1b2a", borderRadius: 1 }}
          />
        )}

        {formData.role === "FREELANCER" && (
          <>
            <TextField
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              multiline
              minRows={3}
              fullWidth
              variant="filled"
              InputProps={{ style: { color: "#e0f7fa" } }}
              InputLabelProps={{ style: { color: "#80deea" } }}
              sx={{ backgroundColor: "#0d1b2a", borderRadius: 1 }}
            />
            <TextField
              label="Skills (comma-separated)"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              fullWidth
              variant="filled"
              InputProps={{ style: { color: "#e0f7fa" } }}
              InputLabelProps={{ style: { color: "#80deea" } }}
              sx={{ backgroundColor: "#0d1b2a", borderRadius: 1 }}
            />
          </>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          sx={{
            backgroundColor: "#00bcd4",
            color: "#0d1b2a",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#00acc1" },
          }}
        >
          Register
        </Button>

        <Typography variant="body2" align="center" color="#e0f7fa">
          Already have an account?{" "}
          <Link
            component="button"
            onClick={() => navigate("/login")}
            underline="hover"
            sx={{ color: "#00bcd4", fontWeight: "bold" }}
          >
            Login
          </Link>
        </Typography>

        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default RegistrationForm;
