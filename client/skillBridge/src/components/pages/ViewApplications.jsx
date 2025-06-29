import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; 
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
  Collapse,
  Box,
} from "@mui/material";
import axios from "axios";
import FullScreenLayout from "../FullScreeLayout";
import API_BASE_URL from "../../config/api";

const ViewApplications = () => {
  const { jobId } = useParams();
  const navigate = useNavigate(); 
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [jobName, setJobName] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/applications/${jobId}/all-applications`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const apps = res.data.applicationList || [];
        setApplications(apps);
        setJobName(apps.length > 0 ? res.data.jobName || "Job" : "Job");
        setSnackbar({
          open: true,
          message: res.data.message,
          severity: "success",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message:
            error?.response?.data?.message || "Failed to fetch applications",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchApplications();
    } else {
      setLoading(false);
      setSnackbar({
        open: true,
        message: "No Job ID provided in URL",
        severity: "error",
      });
    }
  }, [jobId]);

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <FullScreenLayout>
      <Box
        sx={{
          maxWidth: "1000px",
          mx: "auto",
          px: 2,
          py: 5,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          color: "#e0f7fa",
        }}
      >
        {/* 👇 Back Button */}
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

        {loading ? (
          <CircularProgress sx={{ color: "#00bcd4", mx: "auto" }} />
        ) : applications.length === 0 ? (
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            No applications found for this job.
          </Typography>
        ) : (
          <>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: "2rem",
                mb: 2,
                textAlign: "center",
                color: "#00e5ff",
              }}
            >
              Applications for{" "}
              <span style={{ color: "#80deea" }}>{jobName}</span>
            </Typography>

            <List disablePadding>
              {applications.map((application) => (
                <ListItem
                  key={application.id}
                  sx={{
                    mb: 3,
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "#142a4c",
                    boxShadow: "0 0 20px rgba(0, 188, 212, 0.15)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{ color: "#fff", fontWeight: "bold" }}
                      >
                        Applicant: {application.applicantName || "N/A"}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Box sx={{ mt: 1, color: "#ccc", fontSize: "0.95rem" }}>
                          <div>
                            <strong>Proposed Budget:</strong>{" "}
                            ₹{application.proposedBudget || "Agree With Yours"}
                          </div>
                          <div>
                            <strong>Duration:</strong>{" "}
                            {application.duration || "Not specified"} days
                          </div>
                        </Box>

                        <Box mt={2}>
                          <Button
                            onClick={() => toggleExpand(application.id)}
                            variant="outlined"
                            size="small"
                            sx={{
                              textTransform: "none",
                              borderColor: "#00bcd4",
                              color: "#00e5ff",
                              "&:hover": {
                                borderColor: "#00acc1",
                                color: "#00bcd4",
                              },
                            }}
                          >
                            {expandedItems[application.id]
                              ? "Hide Cover Letter"
                              : "View Cover Letter"}
                          </Button>
                        </Box>

                        <Collapse in={expandedItems[application.id]}>
                          <Box
                            mt={2}
                            sx={{
                              maxHeight: "200px",
                              overflowY: "auto",
                              pr: 1,
                              border: "1px solid #00bcd4",
                              borderRadius: 2,
                              p: 2,
                              mt: 2,
                              bgcolor: "#0f223f",
                              scrollbarWidth: "thin",
                              "&::-webkit-scrollbar": {
                                width: "5px",
                              },
                              "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#00acc1",
                                borderRadius: "3px",
                              },
                            }}
                          >
                            <Typography variant="body2" sx={{ color: "#ccc" }}>
                              Cover Letter:
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                whiteSpace: "pre-line",
                                mt: 1,
                                color: "#e0f7fa",
                              }}
                            >
                              {application.coverLetter || "Not provided"}
                            </Typography>
                          </Box>

                          <Box mt={2}>
                            <Button
                              variant="contained"
                              color="success"
                              sx={{ mr: 1, textTransform: "none" }}
                            >
                              Accept Offer
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              sx={{ textTransform: "none" }}
                            >
                              Decline Offer
                            </Button>
                          </Box>
                        </Collapse>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </>
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

export default ViewApplications;
