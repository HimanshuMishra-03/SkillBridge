import React from "react";
import { jwtDecode } from "jwt-decode";
import { Box, Typography, Container, Button, Stack, Grid, Paper, Chip, Divider, Avatar } from "@mui/material";
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
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: colors.primary }}>F</Avatar>
            <Box>
              <Typography variant="h5" fontWeight={800}>Your workspace</Typography>
              <Typography variant="body2" color={colors.textSecondary}>Track gigs, proposals and earnings.</Typography>
            </Box>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button variant="contained" onClick={() => navigate('/freelancer/all-jobs')} sx={{ bgcolor: colors.primary, "&:hover": { bgcolor: colors.primaryDark }}}>Find Jobs</Button>
            <Button variant="outlined" onClick={() => navigate('/freelancer/view-all-applications')} sx={{ borderColor: colors.primary, color: colors.primary }}>My Applications</Button>
          </Stack>
        </Box>

        <Grid container spacing={2}>
          {[
            { label: 'Active Gigs', value: 2, chip: 'In progress', color: colors.primary },
            { label: 'Proposals Sent', value: 14, chip: 'Last 30d', color: colors.secondary },
            { label: 'Invitations', value: 3, chip: 'New', color: colors.success },
            { label: 'Earnings', value: '$1,120', chip: 'This month', color: colors.textPrimary },
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
                <Typography variant="h6" fontWeight={700}>Recommended for you</Typography>
                <Button variant="text" onClick={() => navigate('/freelancer/all-jobs')}>View all</Button>
              </Box>
              <Divider />
              <Stack spacing={1} sx={{ mt: 1 }}>
                {[
                  { title: 'Next.js dashboard build', budget: '$800', tag: 'Frontend' },
                  { title: 'REST API integration', budget: '$600', tag: 'Backend' },
                  { title: 'Landing page redesign', budget: '$450', tag: 'UI/UX' },
                ].map((job) => (
                  <Box key={job.title} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, borderRadius: 1, "&:hover": { backgroundColor: colors.lightGray } }}>
                    <Box>
                      <Typography fontWeight={600}>{job.title}</Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip size="small" label={job.tag} />
                        <Typography variant="caption" color={colors.textSecondary}>{job.budget}</Typography>
                      </Stack>
                    </Box>
                    <Button size="small" variant="outlined" onClick={() => navigate('/job-details/preview')} sx={{ borderColor: colors.primary, color: colors.primary }}>View</Button>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 2, border: `1px solid ${colors.border}`, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={700} mb={1}>Quick Actions</Typography>
              <Stack spacing={1}>
                <Button fullWidth variant="contained" onClick={() => navigate('/freelancer/all-jobs')} sx={{ bgcolor: colors.primary, "&:hover": { bgcolor: colors.primaryDark }}}>Browse Jobs</Button>
                <Button fullWidth variant="outlined" onClick={() => navigate('/freelancer/view-all-applications')} sx={{ borderColor: colors.primary, color: colors.primary }}>Track Applications</Button>
                <Button fullWidth variant="text" onClick={() => navigate('/projectDashboard/overview')}>Project Dashboard</Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </FullScreenLayout>
  );
}

export { FreelancerDashboard };
