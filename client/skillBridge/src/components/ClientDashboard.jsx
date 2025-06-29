import React from "react";
import { jwtDecode } from "jwt-decode";
import { Box, Typography, Container } from "@mui/material";
import GetMyJobs from "./pages/GetMyJobs";

function ClientDashboard() {
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
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          mb={4}
          color="#00bcd4"
          fontWeight="bold"
          textAlign="center"
        >
          Client Dashboard
        </Typography>
        <GetMyJobs />
      </Container>
    </Box>
  );
}

export { ClientDashboard };
