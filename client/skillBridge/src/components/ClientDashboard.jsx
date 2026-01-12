import React from "react";
import { jwtDecode } from "jwt-decode";
import { Box, Typography, Button, Container, Stack, Grid, Paper, Chip, Divider } from "@mui/material";
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
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4, flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="h4" color={colors.textPrimary} fontWeight={800} letterSpacing={0.3}>
              Welcome back
            </Typography>
            <Typography variant="body1" color={colors.textSecondary}>
              Manage jobs, track applications, and hire talents faster.
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button variant="contained" onClick={() => navigate('/client/post-jobs')} sx={{ bgcolor: colors.primary, "&:hover": { bgcolor: colors.primaryDark }}}>Post Job</Button>
            <Button variant="outlined" onClick={() => navigate('/client/my-jobs')} sx={{ borderColor: colors.primary, color: colors.primary, "&:hover": { bgcolor: colors.lightGray }}}>My Jobs</Button>
          </Stack>
        </Box>

        <Grid container spacing={2}>
          {[
            { label: 'Active Jobs', value: 3, chip: 'Live', color: colors.primary },
            { label: 'Open Applications', value: 27, chip: 'Incoming', color: colors.secondary },
            { label: 'Hires', value: 5, chip: 'Total', color: colors.success },
            { label: 'Budget Spent', value: '$3,250', chip: 'This month', color: colors.textPrimary },
          ].map((kpi) => (
            <Grid item xs={12} sm={6} md={3} key={kpi.label}>
              <Paper elevation={0} sx={{ p: 2, border: `1px solid ${colors.border}`, borderRadius: 2, bgcolor: colors.card, transition: 'transform .2s, box-shadow .2s', "&:hover": { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' } }}>
                <Chip size="small" label={kpi.chip} sx={{ mb: 1, bgcolor: colors.lightGray }} />
                <Typography variant="h5" fontWeight={800} color={kpi.color}>{kpi.value}</Typography>
                <Typography variant="body2" color={colors.textSecondary}>{kpi.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 2, border: `1px solid ${colors.border}`, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6" fontWeight={700}>Recent Job Posts</Typography>
                <Button variant="text" onClick={() => navigate('/client/my-jobs')}>View all</Button>
              </Box>
              <Divider />
              <Stack spacing={1} sx={{ mt: 1 }}>
                {[
                  { title: 'React Frontend for Dashboard', applicants: 12, status: 'Open' },
                  { title: 'Node API for Mobile App', applicants: 8, status: 'Screening' },
                  { title: 'UI/UX for Landing Page', applicants: 21, status: 'Open' },
                ].map((job) => (
                  <Box key={job.title} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, borderRadius: 1, "&:hover": { backgroundColor: colors.lightGray } }}>
                    <Box>
                      <Typography fontWeight={600}>{job.title}</Typography>
                      <Typography variant="caption" color={colors.textSecondary}>{job.applicants} applicants</Typography>
                    </Box>
                    <Chip size="small" label={job.status} />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 2, border: `1px solid ${colors.border}`, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={700} mb={1}>Quick Actions</Typography>
              <Stack spacing={1}>
                <Button fullWidth variant="contained" onClick={() => navigate('/client/post-jobs')} sx={{ bgcolor: colors.primary, "&:hover": { bgcolor: colors.primaryDark }}}>Create a Job</Button>
                <Button fullWidth variant="outlined" onClick={() => navigate('/view-applications/last')} sx={{ borderColor: colors.primary, color: colors.primary }}>Review Applications</Button>
                <Button fullWidth variant="text" onClick={() => navigate('/client/my-jobs')}>Manage Jobs</Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </FullScreenLayout>
  );
}

export { ClientDashboard };
