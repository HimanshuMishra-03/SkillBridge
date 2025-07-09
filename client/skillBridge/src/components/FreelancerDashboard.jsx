import React from "react";
import { jwtDecode } from "jwt-decode";
import { Box, Typography, Container, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import FullScreenLayout from "./FullScreeLayout.jsx";
import daylightTheme from "../theme";

function FreelancerDashboard() {
  const navigate = useNavigate();
  const { colors } = daylightTheme;
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <FullScreenLayout>
        <Box textAlign="center">
          <Typography variant="h5" color={colors.primary}>
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
          <Typography variant="h5" color={colors.error}>
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
          <Typography variant="h5" color={colors.error}>
            You are not authorised to view this page
          </Typography>
          <Button
            onClick={() => navigate("/login")}
            sx={{
              mt: 2,
              color: colors.primary,
              borderColor: colors.primary,
              "&:hover": {
                backgroundColor: colors.lightGray,
              },
            }}
            variant="outlined"
          >
            Go Back
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
          color={colors.primary}
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
              bgcolor: colors.primary,
              color: "#fff",
              fontWeight: "bold",
              width: "100%",
              "&:hover": {
                bgcolor: colors.primaryDark,
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
              bgcolor: colors.primary,
              color: "#fff",
              fontWeight: "bold",
              width: "100%",
              "&:hover": {
                bgcolor: colors.primaryDark,
              },
            }}
            onClick={() => navigate("/freelancer/view-all-applications")}
          >
            🔍 View All Applications
          </Button>
        </Stack>
      </Container>
    </FullScreenLayout>
  );
}

export { FreelancerDashboard };
