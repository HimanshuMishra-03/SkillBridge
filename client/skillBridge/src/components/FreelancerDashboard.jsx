import React from "react";
import { jwtDecode } from "jwt-decode";
import { Box, Typography, Container, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import FullScreenLayout from "./FullScreeLayout.jsx";

function FreelancerDashboard() {
  const navigate = useNavigate();
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
          <Button onClick={()=>navigate('/login')}>
            Go Back!
          </Button>
        </Box>
      </FullScreenLayout>
    );
  }

  return (
    <FullScreenLayout>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          mb={6}
          color="#00bcd4"
          fontWeight="900"
          textAlign="center"
          letterSpacing={1}
        >
          FREELANCER DASHBOARD
        </Typography>

        <Stack spacing={4}>
          <Button
            variant="contained"
            size="large"
            sx={{
              py: 3,
              fontSize: "1.5rem",
              borderRadius: "16px",
              bgcolor: "#00bcd4",
              color: "#000",
              fontWeight: "bold",
              width: "100%",
              "&:hover": {
                bgcolor: "#00acc1",
              },
            }}
            onClick={() => navigate("/freelancer/all-jobs")}
          >
            🔍 View All Available Jobs
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{
              py: 3,
              fontSize: "1.5rem",
              borderRadius: "16px",
              bgcolor: "#00bcd4",
              color: "#000",
              fontWeight: "bold",
              width: "100%",
              "&:hover": {
                bgcolor: "#00acc1",
              },
            }}
            onClick={() => navigate("/freelancer/view-all-applications")}
          >
            🔍 View All Applications
          </Button>

          {/* You can add more options later like this:
          <Button
            variant="outlined"
            size="large"
            sx={{
              py: 3,
              fontSize: "1.5rem",
              borderRadius: "16px",
              borderColor: "#00bcd4",
              color: "#00bcd4",
              fontWeight: "bold",
              width: "100%",
              "&:hover": {
                bgcolor: "#00bcd4",
                color: "#000",
              },
            }}
            onClick={() => navigate("/freelancer/applied-jobs")}
          >
            📁 View Applied Jobs
          </Button> 
          */}
        </Stack>
      </Container>
    </FullScreenLayout>
  );
}

export { FreelancerDashboard };
