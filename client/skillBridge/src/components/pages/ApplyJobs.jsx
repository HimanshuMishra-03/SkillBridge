import React, { useState } from "react";
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
function ApplyJobs() {
  const token = localStorage.getItem("token");
  if (!token) return <h1>Please login first</h1>;
  let decoded = {};
  try {
    decoded = jwtDecode(token);
  } catch (err) {
    return <h1>Invalid token</h1>;
  }

  if (decoded.role !== "FREELANCER") return <h1>You are not authorised to view this page</h1>;

  const { id: jobId } = useParams(); // Get jobId from URL
  const [formData, setFormData] = useState({
    coverLetter: "",
    proposedBudget: "",
    duration: "",
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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
        py: 5,
        px: 2,
        color: "#e0f7fa",
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 4,
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.05)",
          boxShadow: "0 8px 30px rgba(0,229,255,0.15)",
          border: "1px solid rgba(0,229,255,0.2)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 700,
            color: "#00e5ff",
            textShadow: "0 0 10px rgba(0,229,255,0.6)",
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
            value={formData.coverLetter}
            onChange={handleChange}
            multiline
            rows={4}
            margin="normal"
            required
            InputLabelProps={{ style: { color: "#00e5ff" } }}
            InputProps={{
              style: { color: "#e0f7fa" },
            }}
          />
          <TextField
            fullWidth
            label="Proposed Budget"
            name="proposedBudget"
            type="number"
            value={formData.proposedBudget}
            onChange={handleChange}
            margin="normal"
            required
            InputLabelProps={{ style: { color: "#00e5ff" } }}
            InputProps={{
              style: { color: "#e0f7fa" },
            }}
          />
          <TextField
            fullWidth
            label="Duration (in days)"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            margin="normal"
            required
            InputLabelProps={{ style: { color: "#00e5ff" } }}
            InputProps={{
              style: { color: "#e0f7fa" },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: "#00e5ff",
              color: "#001f3f",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#00bcd4",
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
  );
}

export default ApplyJobs;
