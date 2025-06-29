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

  const role = decoded.role;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        py: 5,
        px: 2,
        background: "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)",
        color: "#e0f7fa",
        overflowX: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "#00e5ff",
            mb: 4,
            textShadow: "0 0 10px rgba(0,229,255,0.8)",
          }}
        >
          All Posted Jobs
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress sx={{ color: "#00bcd4" }} />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {jobs.length === 0 ? (
              <Typography variant="body1" sx={{ color: "#ccc" }}>
                No jobs found.
              </Typography>
            ) : (
              jobs.map((job) => (
                <Grid item xs={12} sm={6} md={4} key={job.id}>
                  <Card
                    sx={{
                      backdropFilter: "blur(10px)",
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,229,255,0.05) 100%)",
                      border: "1px solid rgba(0,229,255,0.2)",
                      boxShadow: "0 4px 30px rgba(0,229,255,0.2)",
                      borderRadius: "16px",
                      color: "#e0f7fa",
                      transition: "0.3s",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0 0 20px rgba(0,229,255,0.3)",
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: 600, color: "#00e5ff" }}
                        noWrap
                      >
                        {job.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ color: "#ccc" }}
                        noWrap
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
                          color: "#00e5ff",
                          borderColor: "#00e5ff",
                          textTransform: "none",
                          "&:hover": {
                            borderColor: "#00bcd4",
                            color: "#00bcd4",
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
  );
};

export default GetAllJobs;
