import React from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  Typography,
  Link,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import FullScreenLayout from "./FullScreeLayout";
import daylightTheme from "../theme"; // 🌈 import theme

const stepsClient = [
  "Post job requirements in minutes and start receiving proposals.",
  "Browse and filter freelancers based on experience, skills, and reviews.",
  "Manage project workflow and timelines from a central dashboard.",
  "Pay securely only after milestones or final delivery.",
  "Build long-term relationships with trusted professionals.",
];

const stepsFreelancer = [
  "Explore curated projects from real clients with clear requirements.",
  "Create a profile to highlight your portfolio, skills, and achievements.",
  "Easily submit proposals and communicate directly with clients.",
  "Track deadlines, deliverables, and payments in one place.",
  "Grow your network and reputation within a professional ecosystem.",
];

const HomePage = () => {
  const { colors } = daylightTheme;
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderSteps = (steps) => {
    return steps.map((step, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.3 }}
      >
        <Box
          sx={{
            backgroundColor: colors.lightGray,
            p: 2,
            borderRadius: 3,
            width: isMobile ? "90%" : "60%",
            mb: 3,
            ml: isMobile ? "auto" : index % 2 === 0 ? 0 : "auto",
            mr: isMobile ? "auto" : index % 2 === 0 ? "auto" : 0,
            color: colors.textPrimary,
            border: `1px solid ${colors.border}`,
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
            },
          }}
        >
          <Typography variant="body1" fontWeight="500">
            {`${index + 1}. ${step}`}
          </Typography>
        </Box>
      </motion.div>
    ));
  };

  return (
    <FullScreenLayout>
      {/* HERO SECTION */}
      <Box
        sx={{
          width: {
            xs: "72vw",
            sm: "60vw",
            md: "60vw",
            lg: "82vw",
          },
          backgroundColor: colors.background,
          py: 10,
          px: 2.5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ width: "100%", maxWidth: 800, textAlign: "center" }}
        >
          <Typography
            variant={isMobile ? "h6" : "h3"}
            sx={{ color: colors.primary, mb: 1 }}
          >
            Welcome to
          </Typography>

          <Typography
            variant={isMobile ? "h3" : "h1"}
            fontWeight="bold"
            sx={{
              color: colors.primary,
              letterSpacing: "0.1em",
              userSelect: "none",
              mb: 4,
            }}
          >
            SkillBridge
          </Typography>

          <Typography
            variant={isMobile ? "body1" : "h6"}
            sx={{ color: colors.textSecondary, mb: 5 }}
          >
            Your gateway to freelance opportunities and top talent
          </Typography>

          <Stack
            spacing={2}
            direction={isMobile ? "column" : "row"}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/register?role=client")}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
                width: isMobile ? "100%" : "auto",
                backgroundColor: colors.primary,
                color: "#fff",
                "&:hover": { backgroundColor: colors.primaryDark },
              }}
            >
              POST A JOB
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/register?role=freelancer")}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
                borderColor: colors.primary,
                color: colors.primary,
                width: isMobile ? "100%" : "auto",
                "&:hover": {
                  borderColor: colors.primaryDark,
                  color: colors.primaryDark,
                },
              }}
            >
              VIEW & APPLY FOR JOBS
            </Button>
          </Stack>

          <Box mt={4}>
            <Typography variant="body1" sx={{ color: colors.textSecondary }}>
              Already registered?{" "}
              <Link href="/login" underline="hover" sx={{ color: colors.primary }}>
                Login here
              </Link>
            </Typography>
          </Box>
        </motion.div>
      </Box>

      {/* CLIENT SECTION */}
      <Box
        sx={{
          width: {
            xs: "70vw",
            sm: "60vw",
            md: "60vw",
            lg: "82vw",
          },
          backgroundColor: colors.card,
          color: colors.textPrimary,
          py: 10,
          px: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{ maxWidth: 1000, width: "100%", textAlign: "center" }}
        >
          <Typography
            variant={isMobile ? "h4" : "h2"}
            fontWeight="bold"
            sx={{ color: colors.primary, mb: 4 }}
          >
            CLIENT
          </Typography>
          <Typography variant="h5" sx={{ mb: 5, color: colors.textSecondary }}>
            What You Can Do
          </Typography>
          {renderSteps(stepsClient)}
        </motion.div>
      </Box>

      {/* FREELANCER SECTION */}
      <Box
        sx={{
          width: {
            xs: "70vw",
            sm: "60vw",
            md: "60vw",
            lg: "82vw",
          },
          backgroundColor: colors.background,
          color: colors.textPrimary,
          py: 10,
          px: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{ maxWidth: 1000, width: "100%", textAlign: "center" }}
        >
          <Typography
            variant={isMobile ? "h4" : "h2"}
            fontWeight="bold"
            sx={{ color: colors.primary, mb: 4 }}
          >
            FREELANCER
          </Typography>
          <Typography variant="h5" sx={{ mb: 5, color: colors.textSecondary }}>
            Why You’ll Love Working Here
          </Typography>
          {renderSteps(stepsFreelancer)}
        </motion.div>
      </Box>
    </FullScreenLayout>
  );
};

export default HomePage;
