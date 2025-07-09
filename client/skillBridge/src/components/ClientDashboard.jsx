import React from "react";
import { jwtDecode } from "jwt-decode";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import daylightTheme from "../theme";
import FullScreenLayout from "./FullScreeLayout.jsx";

function ClientDashboard() {
  const navigate = useNavigate();
  const { colors } = daylightTheme;
  const token = localStorage.getItem("token");

  let decoded = {};
  try {
    if (!token) throw new Error("Missing token");
    decoded = jwtDecode(token);
  } catch (err) {
    return (
      <FullScreenLayout>
        <Box textAlign="center">
          <Typography variant="h5" color={colors.error}>
            {token ? "Invalid token" : "Please login first"}
          </Typography>
        </Box>
      </FullScreenLayout>
    );
  }

  if (decoded.role !== "CLIENT") {
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
          CLIENT DASHBOARD
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
            onClick={() => navigate("/client/post-jobs")}
          >
            🚀 Post a New Job
          </Button>

          <Button
            variant="outlined"
            size="large"
            sx={{
              py: 3,
              fontSize: "1.5rem",
              borderRadius: "16px",
              borderColor: colors.primary,
              color: colors.primary,
              fontWeight: "bold",
              width: "100%",
              "&:hover": {
                bgcolor: colors.primary,
                color: "#fff",
              },
            }}
            onClick={() => navigate("/client/my-jobs")}
          >
            📂 View My Jobs
          </Button>
        </Stack>
      </Container>
    </FullScreenLayout>
  );
}

export { ClientDashboard };
