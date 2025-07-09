import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import FullScreenLayout from "../FullScreeLayout";
import theme from "../../theme"; // 🌈 Theme imported

function ApplyJobs() {
  const { id: jobId } = useParams();
  const { colors } = theme;

  const [formData, setFormData] = useState({
    coverLetter: "",
    proposedBudget: "",
    duration: "",
  });
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");

  const [token, setToken] = useState(null);
  const [decoded, setDecoded] = useState(null);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) {
      setError("Please login first");
      setReady(true);
      return;
    }
    try {
      const dec = jwtDecode(t);
      if (dec.role !== "FREELANCER") {
        setError("You are not authorised to view this page");
      } else {
        setToken(t);
        setDecoded(dec);
      }
    } catch {
      setError("Invalid token");
    } finally {
      setReady(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/jobs/${jobId}/apply`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message || "Applied successfully!");
      setSeverity("success");
      setOpen(true);
      setFormData({
        coverLetter: "",
        proposedBudget: "",
        duration: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to apply for the job.");
      setSeverity("error");
      setOpen(true);
    }
  };

  if (!ready) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <FullScreenLayout>
      <Box
        sx={{
          minHeight: "50vh",
          py: 5,
          px: 2,
          color: colors.textPrimary,
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            mx: "auto",
            p: 4,
            borderRadius: 4,
            backgroundColor: colors.card,
            boxShadow: "0 0 15px rgba(0,0,0,0.1)",
            border: `1px solid ${colors.border}`,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 700,
              color: colors.primary,
              mb: 3,
            }}
          >
            Apply for Job
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Cover Letter"
              name="coverLetter"
              variant="filled"
              value={formData.coverLetter}
              onChange={handleChange}
              multiline
              rows={4}
              margin="normal"
              required
              InputLabelProps={{ style: { color: colors.primary } }}
              InputProps={{ style: { color: colors.textPrimary } }}
              sx={{
                backgroundColor: colors.lightGray,
                borderRadius: 1,
              }}
            />
            <TextField
              fullWidth
              label="Proposed Budget"
              name="proposedBudget"
              variant="filled"
              type="number"
              value={formData.proposedBudget}
              onChange={handleChange}
              margin="normal"
              required
              InputLabelProps={{ style: { color: colors.primary } }}
              InputProps={{ style: { color: colors.textPrimary } }}
              sx={{
                backgroundColor: colors.lightGray,
                borderRadius: 1,
              }}
            />
            <TextField
              fullWidth
              label="Duration (in days)"
              name="duration"
              variant="filled"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              margin="normal"
              required
              InputLabelProps={{ style: { color: colors.primary } }}
              InputProps={{ style: { color: colors.textPrimary } }}
              sx={{
                backgroundColor: colors.lightGray,
                borderRadius: 1,
              }}
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: colors.primary,
                color: colors.card,
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: colors.primaryDark,
                },
              }}
            >
              Submit Application
            </Button>
          </form>
        </Box>

        <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
          <Alert
            onClose={() => setOpen(false)}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </FullScreenLayout>
  );
}

export default ApplyJobs;
