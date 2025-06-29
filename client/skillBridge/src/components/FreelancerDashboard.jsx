import React from "react";
import { jwtDecode } from "jwt-decode";
import { Box, Typography } from "@mui/material";
import FullScreenLayout from "./FullScreeLayout.jsx";
import GetAllJobs from "./pages/GetAllJobs";

function FreelancerDashboard() {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <FullScreenLayout>
        <Box textAlign="center">
          <Typography variant="h5" color="#00bcd4">
            Please login first
          </Typography>
        </Box>
      </FullScreenLayout>
    );
  }

  let decoded = {};
  try {
    decoded = jwtDecode(token);
  } catch (err) {
    return (
      <FullScreenLayout>
        <Box textAlign="center">
          <Typography variant="h5" color="#ff1744">
            Invalid token
          </Typography>
        </Box>
      </FullScreenLayout>
    );
  }

  if (decoded.role !== "FREELANCER") {
    return (
      <FullScreenLayout>
        <Box textAlign="center">
          <Typography variant="h5" color="#ff1744">
            You are not authorised to view this page
          </Typography>
        </Box>
      </FullScreenLayout>
    );
  }

  return (
    <FullScreenLayout>
      <Box width="100%">
        <GetAllJobs />
      </Box>
    </FullScreenLayout>
  );
}

export { FreelancerDashboard };
