import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import FullScreenLayout from "../FullScreeLayout.jsx";
import API_BASE_URL from "../../config/api.js";
import theme from "../../theme.js";

const { colors } = theme;

const GetMyJobs = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) return <h1>Please login first</h1>;

  let decoded = {};
  try {
    decoded = jwtDecode(token);
  } catch (err) {
    return <h1>Invalid token</h1>;
  }

  if (decoded.role !== "CLIENT")
    return <h1>You are not authorised to view this page</h1>;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/jobs/my-jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(res.data.jobs);
      setSnackbar({
        open: true,
        message: res.data.message,
        severity: "success",
      });
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Failed to fetch jobs";
      setSnackbar({ open: true, message: msg, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/jobs/${jobToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbar({
        open: true,
        message: "Job deleted successfully",
        severity: "success",
      });
      setOpenDialog(false);
      setJobToDelete(null);
      fetchJobs(); // Refresh job list
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Failed to delete job";
      setSnackbar({ open: true, message: msg, severity: "error" });
      setOpenDialog(false);
    }
  };

  return (
    <FullScreenLayout>
      <Button
        variant="outlined"
        onClick={() => navigate("/client-dashboard")}
        sx={{
          alignSelf: "flex-start",
          mb: 1,
          color: colors.primary,
          borderColor: colors.primary,
          textTransform: "none",
          "&:hover": {
            borderColor: colors.primaryDark,
            color: colors.primaryDark,
          },
        }}
      >
        ← Back
      </Button>

      <Box
        sx={{
          maxWidth: "50vw",
          mx: "auto",
          px: 2,
          py: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "@media (max-width: 600px)": {
            px: 1,
            py: 3,
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: colors.primary,
            fontWeight: 700,
            fontSize: "1.8rem",
            mb: 4,
            textAlign: "left",
            width: "100%",
            borderBottom: `2px solid ${colors.primary}`,
            pb: 1,
            "@media (max-width: 600px)": {
              fontSize: "1.4rem",
            },
          }}
        >
          My Posted Jobs
        </Typography>

        {loading ? (
          <CircularProgress sx={{ color: colors.primary }} />
        ) : jobs.length === 0 ? (
          <Typography sx={{ color: colors.textSecondary }}>
            No jobs found.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {jobs.map((job) => (
              <Grid item xs={12} key={job.id}>
                <Card
                  sx={{
                    backgroundColor: colors.card,
                    color: colors.textPrimary,
                    borderRadius: 3,
                    border: `1px solid ${colors.border}`,
                    boxShadow: `0 0 16px ${colors.primary}20`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "24vh",
                    width: "50vw",
                    "@media (max-width: 600px)": {
                      width: "90vw",
                      height: "auto",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: colors.primary,
                      }}
                    >
                      {job.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.textSecondary,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        mb: 2,
                      }}
                    >
                      {job.description}
                    </Typography>
                  </CardContent>

                  {job.isAccepted === true ? (
                    <Button
                      onClick={() =>
                        navigate(`/projectDashboard/${job.projectId}`)
                      }
                      sx={{
                        color: colors.primary,
                        fontWeight: 600,
                        "&:hover": {
                          color: colors.primaryDark,
                        },
                      }}
                    >
                      View Project →
                    </Button>
                  ) : (
                    <CardActions sx={{ px: 2, pb: 2 }}>
                      <Button
                        size="large"
                        sx={{
                          color: colors.primary,
                          textTransform: "none",
                          "&:hover": { color: colors.primaryDark },
                        }}
                        onClick={() => navigate(`/job-details/${job.id}`)}
                      >
                        View
                      </Button>
                      <Button
                        size="large"
                        sx={{
                          color: colors.textSecondary,
                          textTransform: "none",
                          "&:hover": { color: colors.textPrimary },
                        }}
                        onClick={() => navigate(`/job-edit/${job.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="large"
                        sx={{
                          color: colors.error,
                          textTransform: "none",
                          "&:hover": { color: "#b71c1c" },
                        }}
                        onClick={() => {
                          setJobToDelete(job.id);
                          setOpenDialog(true);
                        }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
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

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this job? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDialog(false)}
              sx={{ color: colors.textSecondary }}
            >
              Cancel
            </Button>
            <Button onClick={handleDelete} sx={{ color: colors.error }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </FullScreenLayout>
  );
};

export default GetMyJobs;
