// src/components/FullScreenLayout.jsx
import React from "react";
import { Box } from "@mui/material";
import daylightTheme from "../theme";

const FullScreenLayout = ({ children }) => {
  const { colors } = daylightTheme;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: colors.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 0,                     // removed padding here
        overflowX: "hidden",       // ✅ removes horizontal scroll
        overflowY: "auto",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1280px",      // ✅ use max-width instead of vw-based width
          px: { xs: 2, sm: 4 },
          py: { xs: 4, sm: 6 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: 4,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          mx: "auto",              // centers inner box
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default FullScreenLayout;
