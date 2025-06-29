import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { jwtDecode } from "jwt-decode";
import {
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import API_BASE_URL from "../../config/api";

const EditJobs = () => {
  const token = localStorage.getItem("token");
  if (!token) return <h1>Session Expired</h1>;
  let decoded = {};
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.log(error);
  }
  if (decoded.role !== "CLIENT") return <h1>You are not authorised, keep your nose out of it!</h1>;

  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: null,
  });
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const job = res.data.jobDetail;
        const formattedDeadline = new Date(job.deadline);
        setJobDetails({ ...job, deadline: formattedDeadline });
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to fetch job details",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch(
        `${API_BASE_URL}/api/jobs/${id}/patch`,
        {
          updateData: {
            ...jobDetails,
            deadline: new Date(jobDetails.deadline).toISOString(),
            budget: Number(jobDetails.budget),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnackbar({
        open: true,
        message: res.data.message,
        severity: "success",
      });
      navigate(`/job-details/${id}`);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error?.response?.data?.message || "Failed to update job",
        severity: "error",
      });
    } finally {
      setLoading(false);
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
          maxWidth: "600px",
          mx: "auto",
          p: 4,
          borderRadius: 4,
          boxShadow: "0 8px 30px rgba(0,229,255,0.15)",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0,229,255,0.2)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 700,
            color: "#00e5ff",
            mb: 3,
            textShadow: "0 0 10px rgba(0,229,255,0.6)",
          }}
        >
          Edit Job Details
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress sx={{ color: "#00bcd4" }} />
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Job Title"
              name="title"
              value={jobDetails.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#00e5ff" } }}
              InputProps={{
                style: { color: "#e0f7fa", borderColor: "#00e5ff" },
              }}
            />
            <TextField
              label="Description"
              name="description"
              value={jobDetails.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              InputLabelProps={{ style: { color: "#00e5ff" } }}
              InputProps={{
                style: { color: "#e0f7fa" },
              }}
            />
            <TextField
              label="Budget"
              name="budget"
              value={jobDetails.budget}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              type="number"
              InputLabelProps={{ style: { color: "#00e5ff" } }}
              InputProps={{
                style: { color: "#e0f7fa" },
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Deadline"
                value={jobDetails.deadline}
                onChange={(newValue) =>
                  setJobDetails((prev) => ({
                    ...prev,
                    deadline: newValue,
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: "#00e5ff" } }}
                    InputProps={{
                      ...params.InputProps,
                      style: { color: "#e0f7fa" },
                    }}
                  />
                )}
              />
            </LocalizationProvider>

            <Button
              type="submit"
              variant="contained"
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
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Job"}
            </Button>
          </form>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default EditJobs;
