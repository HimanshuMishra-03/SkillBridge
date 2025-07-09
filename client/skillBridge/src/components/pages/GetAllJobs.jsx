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
import theme from "../../theme";

const { colors } = theme;

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
          headers: { Authorization: `Bearer ${token}` },
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
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-start" },
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            color: colors.primary,
            borderColor: colors.primary,
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              borderColor: colors.primaryDark,
              color: colors.primaryDark,
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
            color: colors.primary,
            mb: 4,
          }}
        >
          All Posted Jobs
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress sx={{ color: colors.primary }} />
          </Box>
        ) : (
          <Grid container spacing={4} direction="column">
            {jobs.length === 0 ? (
              <Typography
                variant="body1"
                align="center"
                sx={{ width: "100%", color: colors.textSecondary }}
              >
                No jobs found.
              </Typography>
            ) : (
              jobs.map((job) => (
                <Grid item xs={12} sm={6} md={4} key={job.id}>
                  <Card
                    sx={{
                      backdropFilter: "blur(10px)",
                      background: `linear-gradient(135deg, ${colors.card}, ${colors.lightGray})`,
                      border: `1px solid ${colors.border}`,
                      borderRadius: "20px",
                      color: colors.textPrimary,
                      transition: "all 0.3s ease-in-out",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      marginLeft: {
                        xs: "1vw",
                        sm: "11.5vw",
                        md: "15vw",
                        lg: "10vw",
                      },
                      height: {
                        xs: "24vh",
                        sm: "20vh",
                        md: "30vh",
                        lg: "24vh",
                      },
                      width: {
                        xs: "80vw",
                        sm: "60vw",
                        md: "55vw",
                        lg: "40vw",
                      },
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: `0 0 16px ${colors.primary}55`,
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: colors.primary,
                        }}
                        noWrap
                      >
                        {job.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.textSecondary,
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
                          color: colors.primary,
                          borderColor: colors.primary,
                          textTransform: "none",
                          fontWeight: 500,
                          "&:hover": {
                            borderColor: colors.primaryDark,
                            color: colors.primaryDark,
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
    </FullScreenLayout>
  );
};

export default GetAllJobs;
