import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
  Box,
  Container,
} from "@mui/material";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import FullScreenLayout from "../FullScreeLayout.jsx";

const GetAllJobs = () => {
  const token = localStorage.getItem("token");
  if (!token) return <h1>Please login first</h1>;

  let decoded = {};
  try {
    decoded = jwtDecode(token);
  } catch (err) {
    return <h1>Invalid token</h1>;
  }

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/jobs/all-jobs`, {
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

    fetchJobs();
  }, []);

  const detailView = (job) => {
    navigate(`/job-details/${job.id}`);
  };

  return (
    <FullScreenLayout>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          py: 5,
          px: 2,
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#e2e8f0",
        }}
      >
        {/* Back Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-start" },
            mb: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              color: "#38bdf8",
              borderColor: "#38bdf8",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                borderColor: "#0ea5e9",
                color: "#0ea5e9",
              },
            }}
          >
            ← Back
          </Button>
        </Box>

        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 700,
              color: "#38bdf8",
              mb: 4,
              textShadow: "0 0 8px rgba(56, 189, 248, 0.3)",
            }}
          >
            All Posted Jobs
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress sx={{ color: "#38bdf8" }} />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {jobs.length === 0 ? (
                <Typography
                  variant="body1"
                  align="center"
                  sx={{ width: "100%", color: "#94a3b8" }}
                >
                  No jobs found.
                </Typography>
              ) : (
                jobs.map((job) => (
                  <Grid item xs={12} sm={6} md={4} key={job.id}>
                    <Card
                      sx={{
                        backdropFilter: "blur(10px)",
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(56,189,248,0.05))",
                        border: "1px solid rgba(56,189,248,0.2)",
                        boxShadow: "0 8px 24px rgba(56,189,248,0.1)",
                        borderRadius: "20px",
                        color: "#e2e8f0",
                        transition: "all 0.3s ease-in-out",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: "0 0 16px rgba(56,189,248,0.4)",
                        },
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, color: "#38bdf8" }}
                          noWrap
                        >
                          {job.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#94a3b8",
                            mt: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {job.description}
                        </Typography>
                      </CardContent>
                      <CardContent>
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={() => detailView(job)}
                          sx={{
                            color: "#38bdf8",
                            borderColor: "#38bdf8",
                            textTransform: "none",
                            fontWeight: 500,
                            "&:hover": {
                              borderColor: "#0ea5e9",
                              color: "#0ea5e9",
                            },
                          }}
                        >
                          View in Detail
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
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
        </Container>
      </Box>
    </FullScreenLayout>
  );
};

export default GetAllJobs;
