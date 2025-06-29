import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import axios from "axios";
import FullScreenLayout from "../FullScreeLayout"; 
import API_BASE_URL from "../../config/api";

const ViewDetailedJobs = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(false);
  const [freelancer, setFreelancer] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    const fetchJobDetail = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        if (decoded.role === "CLIENT") setClient(true);
        else if (decoded.role === "FREELANCER") setFreelancer(true);
      } catch (err) {
        return;
      }

      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/jobs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setJob(res.data.jobDetail);
        setSnackbar({
          open: true,
          message: res.data.message,
          severity: "success",
        });
      } catch (error) {
        const msg =
          error?.response?.data?.message || "Failed to fetch job details";
        setSnackbar({ open: true, message: msg, severity: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  const viewApplication = () => navigate(`/view-applications/${job.id}`);
  const applyJob = () => navigate(`/job-apply/${job.id}`);

  return (
    <FullScreenLayout>
      <Box
        sx={{
          maxWidth: "900px",
          mx: "auto",
          px: 2,
          py: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#e0f7fa",
        }}
      >
		<Button
				  variant="outlined"
				  onClick={() => navigate(-1)}
				  sx={{
					alignSelf: "flex-start",
					mb: 1,
					color: "#00e5ff",
					borderColor: "#00bcd4",
					textTransform: "none",
					"&:hover": {
					  borderColor: "#00acc1",
					  color: "#00bcd4",
					},
				  }}
				>
				  ← Back
				</Button>
        <Typography
          variant="h4"
          sx={{
            color: "#00e5ff",
            fontWeight: 700,
            fontSize: "2rem",
            mb: 4,
            textAlign: "center",
            borderBottom: "2px solid #00bcd4",
            width: "100%",
            pb: 1,
          }}
        >
          Job Details
        </Typography>

        {loading ? (
          <CircularProgress sx={{ color: "#00bcd4" }} />
        ) : job ? (
          <Card
            sx={{
              backgroundColor: "#142a4c",
              color: "#e0f7fa",
              borderRadius: 3,
              boxShadow: "0 0 20px rgba(0, 188, 212, 0.2)",
              width: "100%",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{ color: "#fff", fontWeight: "bold", mb: 2 }}
              >
                {job.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "#ccc", mb: 2, whiteSpace: "pre-line" }}
              >
                {job.description}
              </Typography>

              <Typography sx={{ color: "#80deea", mb: 1 }}>
                <strong>Budget:</strong> ₹{job.budget}
              </Typography>

              <Typography sx={{ color: "#80deea", mb: 3 }}>
                <strong>Deadline:</strong>{" "}
                {new Date(job.deadline).toLocaleDateString()}
              </Typography>

              {client && (
                <Button
                  onClick={viewApplication}
                  variant="outlined"
                  sx={{
                    borderColor: "#00e5ff",
                    color: "#00e5ff",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#00acc1",
                      color: "#00bcd4",
                    },
                  }}
                >
                  View Applications
                </Button>
              )}

              {freelancer && (
                <Button
                  onClick={applyJob}
                  variant="contained"
                  sx={{
                    backgroundColor: "#00e5ff",
                    color: "#001f3f",
                    textTransform: "none",
                    ml: client ? 2 : 0,
                    "&:hover": {
                      backgroundColor: "#00bcd4",
                    },
                  }}
                >
                  Apply for this job!
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <Typography>No job found</Typography>
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
    </FullScreenLayout>
  );
};

export default ViewDetailedJobs;
