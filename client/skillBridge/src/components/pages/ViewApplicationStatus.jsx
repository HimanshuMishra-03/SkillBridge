import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import FullScreenLayout from "../FullScreeLayout";
import API_BASE_URL from "../../config/api";



const ViewApplicationStatus = () => {
  const navigate = useNavigate()
  const {applicationId} = useParams() 

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        if (!applicationId) {
          throw new Error("Application ID not found in URL.");
        }

        const res = await axios.get(
          `${API_BASE_URL}/api/applications/status/${applicationId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setApplication(res.data.application);
        setMessage(res.data.message || "Application fetched successfully!");
        setSeverity("success");
      } catch (error) {
        setSeverity("error");
        setMessage(
          error?.response?.data?.message ||
            error.message ||
            "Something went wrong!"
        );
      } finally {
        setOpen(true);
        setLoading(false);
      }
    };

    fetchApplicationStatus();
  }, [applicationId]);

  return (
    <FullScreenLayout>
      <Box p={4}>
        <Typography variant="h4" mb={3} color="#00e5ff">
          Application Status
        </Typography>

        {loading ? (
          <CircularProgress color="info" />
        ) : application ? (
          <Box
            sx={{
              border: "1px solid #00e5ff",
              borderRadius: 3,
              padding: 3,
              background: "#0f1c2e",
              boxShadow: "0 0 10px rgba(0,229,255,0.3)",
              color: "#e0f7fa",
            }}
          >
            <Typography variant="h6" mb={2}>
              Job Title: {application.jobTitle}
            </Typography>
            <Typography>Status: {application.status}</Typography>
            <Typography mt={1}>
              Proposed Budget: ₹{application.proposedBudget}
            </Typography>
            <Typography>Duration: {application.duration} days</Typography>
            <Typography mt={2}>
              Cover Letter:
              <br />
              {application.coverLetter}
            </Typography>

            {application.status === "ACCEPTED" ? <Button onClick={()=>navigate(`/projectDashboard/${application.projectId}`)}>Go To Project Dashboard</Button> : <Button
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#00e5ff",
                color: "#000",
                "&:hover": {
                  backgroundColor: "#1de9b6",
                },
              }}
              onClick={() => navigate(-1)}
            >
              Back to My Applications
            </Button>}
          </Box>
        ) : (
          <Typography>No application data found!</Typography>
        )}
      </Box>

      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert severity={severity} onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </FullScreenLayout>
  );
};

export default ViewApplicationStatus;
