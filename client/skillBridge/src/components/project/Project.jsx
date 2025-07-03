import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import FullScreenLayout from "../FullScreeLayout";

const Project = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    const acceptApplication = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/applications/acceptStatus/${applicationId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProject(res.data.project);
        setSnackbar({
          open: true,
          message: res.data.message,
          severity: "success",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message:
            error?.response?.data?.message || "Failed to accept application",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    if (applicationId) acceptApplication();
    else {
      setSnackbar({
        open: true,
        message: "Invalid Application ID",
        severity: "error",
      });
      setLoading(false);
    }
  }, [applicationId]);

  return (
    <FullScreenLayout>
      <Box
      sx={{
        // bgcolor: "#0f223f",
        minHeight: "100vh",
        color: "#e0f7fa",
        px: 3,
        py: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <CircularProgress sx={{ color: "#00e5ff" }} />
      ) : project ? (
        <Paper
          elevation={5}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "#142a4c",
            color: "#e0f7fa",
            // boxShadow: "0 0 30px rgba(0, 229, 255, 0.15)",
            maxWidth: 600,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, color: "#00e5ff" }}>
            🎉 Project Created!
          </Typography>

          {/* <Typography sx={{ mb: 1 }}>
            <strong>Project ID:</strong> {project.projectId}
          </Typography> */}
          <Typography sx={{ mb: 1 }}>
            <strong>Status:</strong> {project.status}
          </Typography>
          {/* <Typography sx={{ mb: 1 }}>
            <strong>Freelancer ID:</strong> {project.freelancerId}
          </Typography> */}
          {/* <Typography sx={{ mb: 1 }}>
            <strong>Client ID:</strong> {project.clientId}
          </Typography> */}

          <Button
            variant="outlined"
            sx={{
              mt: 3,
              textTransform: "none",
              color: "#00e5ff",
              borderColor: "#00bcd4",
              "&:hover": {
                borderColor: "#00acc1",
                color: "#00bcd4",
              },
            }}
            onClick={() => navigate(`/projectDashboard/${project.projectId}`)}
          >
            Go to Project Dashboard →
          </Button>
        </Paper>
      ) : (
        <Typography variant="h6">Something went wrong.</Typography>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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
    </FullScreenLayout>
  );
};

export default Project;
