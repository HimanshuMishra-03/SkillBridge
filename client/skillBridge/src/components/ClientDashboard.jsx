import React from "react";
import { jwtDecode } from "jwt-decode";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router";

function ClientDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let decoded = {};
  try {
    if (!token) throw new Error("Missing token");
    decoded = jwtDecode(token);
  } catch (err) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          bgcolor: "#0d1b2a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Typography
          variant="h5"
          color="#ff1744"
          fontWeight="bold"
          textAlign="center"
        >
          {token ? "Invalid token" : "Please login first"}
        </Typography>
      </Box>
    );
  }

  if (decoded.role !== "CLIENT") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          bgcolor: "#0d1b2a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Typography
          variant="h5"
          color="#ff1744"
          fontWeight="bold"
          textAlign="center"
        >
          You are not authorised to view this page
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "#0d1b2a",
        p: 3,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          mb={6}
          color="#00bcd4"
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
              bgcolor: "#00bcd4",
              color: "#000",
              fontWeight: "bold",
              width: "100%",
              "&:hover": {
                bgcolor: "#00acc1",
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
              borderColor: "#00bcd4",
              color: "#00bcd4",
              fontWeight: "bold",
              width: "100%",
              "&:hover": {
                bgcolor: "#00bcd4",
                color: "#000",
              },
            }}
            onClick={() => navigate("/client/my-jobs")}
          >
            📂 View My Jobs
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export { ClientDashboard };
