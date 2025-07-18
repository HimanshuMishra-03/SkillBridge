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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import FullScreenLayout from "../FullScreeLayout";
import API_BASE_URL from "../../config/api";
import theme from "../../theme";

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

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [declineDialogOpen, setDeclineDialogOpen] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [declining, setDeclining] = useState(false);

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
          message: error?.response?.data?.message || "Failed to fetch applications",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    if (jobId) fetchApplications();
    else {
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

  const handleDeclineConfirm = async () => {
    setDeclining(true);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/applications/declineApplication/${selectedApplicationId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSnackbar({
        open: true,
        message: res.data.message,
        severity: "warning",
      });
      setApplications((prev) =>
        prev.map((app) =>
          app.id === selectedApplicationId ? { ...app, status: "DECLINED" } : app
        )
      );
    } catch (error) {
      setSnackbar({
        open: true,
        message: error?.response?.data?.message || "Failed to decline application",
        severity: "error",
      });
    } finally {
      setDeclining(false);
      setDeclineDialogOpen(false);
      setSelectedApplicationId(null);
    }
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
          color: theme.colors.textPrimary,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            alignSelf: "flex-start",
            mb: 1,
            color: theme.colors.primary,
            borderColor: theme.colors.primary,
            textTransform: "none",
            "&:hover": {
              borderColor: theme.colors.primaryDark,
              color: theme.colors.primaryDark,
            },
          }}
        >
          ← Back
        </Button>

        {loading ? (
          <CircularProgress sx={{ color: theme.colors.primary }} />
        ) : applications.length === 0 ? (
          <Typography variant="h5" textAlign="center">
            No applications found for this job.
          </Typography>
        ) : (
          <>
            <Typography
              variant="h4"
              fontWeight={700}
              fontSize="2rem"
              mb={2}
              textAlign="center"
              color={theme.colors.primary}
            >
              Applications for <span style={{ color: theme.colors.textSecondary }}>{jobName}</span>
            </Typography>

            <List disablePadding>
              {applications.map((application) => (
                <ListItem
                  key={application.id}
                  sx={{
                    mb: 3,
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: theme.colors.card,
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.05)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="h6" color={theme.colors.textPrimary} fontWeight="bold">
                        Applicant: {application.applicantName || "N/A"}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Box mt={1} color={theme.colors.textSecondary} fontSize="0.95rem">
                          <div>
                            <strong>Proposed Budget:</strong> ₹
                            {application.proposedBudget || "Agree With Yours"}
                          </div>
                          <div>
                            <strong>Duration:</strong> {application.duration || "Not specified"} days
                          </div>
                        </Box>

                        <Box mt={2}>
                          <Button
                            onClick={() => toggleExpand(application.id)}
                            variant="outlined"
                            size="small"
                            sx={{
                              textTransform: "none",
                              borderColor: theme.colors.primary,
                              color: theme.colors.primary,
                              "&:hover": {
                                borderColor: theme.colors.primaryDark,
                                color: theme.colors.primaryDark,
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
                              border: `1px solid ${theme.colors.border}`,
                              borderRadius: 2,
                              p: 2,
                              bgcolor: theme.colors.lightGray,
                            }}
                          >
                            <Typography variant="body2" color={theme.colors.textSecondary}>
                              Cover Letter:
                            </Typography>
                            <Typography
                              variant="body1"
                              whiteSpace="pre-line"
                              mt={1}
                              color={theme.colors.textPrimary}
                            >
                              {application.coverLetter || "Not provided"}
                            </Typography>
                          </Box>

                          <Box mt={2}>
                            <Button
                              variant="contained"
                              color="success"
                              sx={{ mr: 1, textTransform: "none" }}
                              onClick={() => {
                                setSelectedApplicationId(application.id);
                                setConfirmDialogOpen(true);
                              }}
                            >
                              Accept Offer
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              sx={{ textTransform: "none" }}
                              onClick={() => {
                                setSelectedApplicationId(application.id);
                                setDeclineDialogOpen(true);
                              }}
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

        {/* ✅ Accept Dialog */}
        <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6">Confirm Acceptance</Typography>
            <Typography mt={1}>Are you sure you want to accept this application?</Typography>
            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button onClick={() => setConfirmDialogOpen(false)} color="inherit">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setConfirmDialogOpen(false);
                  navigate(`/acceptStatus/${selectedApplicationId}`);
                }}
                variant="contained"
                color="success"
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Dialog>

        {/* ✅ Decline Dialog */}
        <Dialog open={declineDialogOpen} onClose={() => setDeclineDialogOpen(false)}>
          <DialogTitle>Confirm Decline</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to decline this application?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeclineDialogOpen(false)} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleDeclineConfirm}
              color="error"
              variant="contained"
              disabled={declining}
            >
              {declining ? "Declining..." : "Decline"}
            </Button>
          </DialogActions>
        </Dialog>

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
