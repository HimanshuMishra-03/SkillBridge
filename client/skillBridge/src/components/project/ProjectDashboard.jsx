import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import axios from "axios";
import FullScreenLayout from "../FullScreeLayout";
import API_BASE_URL from "../../config/api";
import theme from "../../theme"; 

function ProjectDashboard() {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const { colors } = theme;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_BASE_URL}/api/projects/project-dashboard/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjectData(res.data.project);
      } catch (err) {
        setError(
          err.response?.data?.message || "Something went wrong!"
        );
        setOpen(true);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) fetchProject();
  }, [projectId]);

  useEffect(() => {
    if (!projectData) return;

    const interval = setInterval(() => {
      const deadline = new Date(projectData.startedAt);
      deadline.setDate(deadline.getDate() + projectData.duration);

      const now = new Date();
      const diff = deadline - now;

      if (diff <= 0) {
        setTimeLeft(null);
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [projectData]);

  if (loading) {
    return (
      <FullScreenLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <CircularProgress sx={{ color: colors.primary }} />
        </Box>
      </FullScreenLayout>
    );
  }

  if (!projectData) {
    return (
      <FullScreenLayout>
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color={colors.error}>
            Project not found or error occurred.
          </Typography>
        </Box>
      </FullScreenLayout>
    );
  }

  const {
    jobTitle,
    duration,
    status,
    startedAt,
    role,
  } = projectData;

  const timeStyle = {
    border: "2px solid",
    borderColor: timeLeft ? colors.primary : colors.error,
    padding: "10px 15px",
    borderRadius: "10px",
    fontWeight: 600,
    color: timeLeft ? colors.primary : colors.error,
    background: timeLeft ? colors.background : "#2c0e0e",
    textAlign: "center",
    transition: "all 0.3s ease-in-out",
  };

  return (
    <FullScreenLayout>
      <Box p={4}>
        <Typography variant="h4" mb={1} color={colors.primary}>
          Project Dashboard - {role === "CLIENT" ? "Client View" : "Freelancer View"}
        </Typography>
        <Divider sx={{ mb: 3, background: colors.primary }} />

        <Box
          sx={{
            background: colors.lightGray,
            padding: 3,
            borderRadius: 4,
            boxShadow: "0 0 15px rgba(0,0,0,0.1)",
            color: colors.textPrimary,
            lineHeight: 1.8,
          }}
        >
          <Typography>Job Title: {jobTitle}</Typography>
          <Typography>Status: {status}</Typography>
          <Typography>Duration: {duration} days</Typography>
          <Typography>
            Started At: {new Date(startedAt).toLocaleString()}
          </Typography>

          <Box mt={3} sx={timeStyle}>
            {timeLeft ? (
              <Typography>
                ⏳ Time Left: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </Typography>
            ) : (
              <Typography>🚨 Deadline Passed</Typography>
            )}
          </Box>
        </Box>

        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
        >
          <Alert severity="error" onClose={() => setOpen(false)}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </FullScreenLayout>
  );
}

export default ProjectDashboard;
