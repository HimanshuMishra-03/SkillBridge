import React, { useEffect, useState } from "react";
import FullScreenLayout from "../FullScreeLayout";
import {
  Box,
  Button,
  Snackbar,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import API_BASE_URL from "../../config/api";
import theme from "../../theme"; // 🌈 THEME POWER 🔥

function ViewMyApplication() {
  const [applications, setApplications] = useState([]);
  const [decoded, setDecoded] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status) {
      case "REJECTED":
        return { bg: theme.colors.error, label: "Rejected" };
      case "ACCEPTED":
        return { bg: theme.colors.success, label: "Accepted" };
      case "PENDING":
        return { bg: theme.colors.warning, label: "Pending" };
      default:
        return { bg: theme.colors.secondary, label: "Unknown" };
    }
  };

  useEffect(() => {
    try {
      if (!token) {
        setError("Please login first");
        setOpen(true);
        setSeverity("error");
        return;
      }
      const dec = jwtDecode(token);
      if (dec.role === "CLIENT") {
        setError("You are not authorised to view this page!");
        setOpen(true);
        setSeverity("error");
        return;
      }
      setDecoded(dec);
    } catch (error) {
      setError("Please login first");
      setOpen(true);
      setSeverity("error");
    }
  }, []);

  useEffect(() => {
    if (!decoded) return;
    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/applications/${decoded.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        setMessage(res.data.message || "Applications fetched!");
        setApplications(res.data.updatedApplications);
      } catch (error) {
        setError(
          error?.response?.data?.message || "Bad response from backend!"
        );
        setOpen(true);
        setSeverity("error");
      }
    };
    fetchApplications();
  }, [decoded]);

  return (
    <FullScreenLayout>
      <Box p={4}>
        <Typography variant="h4" mb={3} color={theme.colors.primary}>
          My Applications
        </Typography>

        {loading ? (
          <CircularProgress sx={{ color: theme.colors.primary }} />
        ) : applications.length === 0 ? (
          <Typography color={theme.colors.textPrimary}>
            No applications found.
          </Typography>
        ) : (
          applications.map((application) => (
            <Box
              key={application.id}
              sx={{
                border: `1px solid ${theme.colors.primary}`,
                borderRadius: 3,
                padding: 3,
                marginBottom: 3,
                background: theme.colors.background,
                boxShadow: `0 0 10px ${theme.colors.shadow}`,
                color: theme.colors.textPrimary,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: `0 0 20px ${theme.colors.shadowHover}`,
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Job Title: {application.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    backgroundColor: getStatusStyle(application.status).bg,
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                >
                  {getStatusStyle(application.status).label}
                </Typography>
              </Box>

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: theme.colors.primary,
                  color: "#000",
                  "&:hover": {
                    backgroundColor: theme.colors.primaryDark,
                  },
                }}
                onClick={() =>
                  navigate(`/freelancer/view-applications/${application.id}`)
                }
              >
                View Application
              </Button>
            </Box>
          ))
        )}
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        <Alert severity={severity} onClose={() => setOpen(false)}>
          {message || error}
        </Alert>
      </Snackbar>
    </FullScreenLayout>
  );
}

export default ViewMyApplication;
