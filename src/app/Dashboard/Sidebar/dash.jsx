"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Fade,
} from "@mui/material";
import { People, Contacts, Campaign, Email } from "@mui/icons-material";
import { fetchDashboardData } from "../../../Api/dashboardApi";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      const { data, error } = await fetchDashboardData();
      if (error) setError(error);
      else setData(data);
      setLoading(false);
    };
    loadDashboard();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress size={50} />
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  const { user, lead_contact, lead_campaign, email_queue } = data;

  const StatCard = ({ title, value, icon, gradient }) => (
    <Fade in timeout={500}>
      <Paper
        sx={{
          p: 2,
          borderRadius: 3,
          boxShadow: 3,
          background: gradient,
          color: "#fff",
          minWidth: 220,
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Box sx={{ textAlign: "right" }}>{icon}</Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "2px",
            backgroundColor: "rgba(255,255,255,0.6)",
            mt: 1,
            mb: 1.5,
          }}
        />

        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          {value}
        </Typography>
      </Paper>
    </Fade>
  );

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Welcome To dashboard
      </Typography>

      <Typography variant="h6" fontWeight="bold" mb={2}>
        User Summary
      </Typography>
      <Grid container spacing={3} mb={4} display="flex" justifyContent="center">
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Users"
            value={user.total_user}
            icon={<People sx={{ fontSize: 40, opacity: 0.8 }} />}
            gradient="linear-gradient(135deg, #1976d2, #42a5f5)"
          />
        </Grid>
      </Grid>

      <Typography variant="h6" fontWeight="bold" mb={2}>
        Lead Contacts
      </Typography>
      <Grid container spacing={3} mb={4} display="flex" justifyContent="center">
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Leads"
            icon={<Contacts sx={{ fontSize: 40 }} />}
            value={lead_contact.total_lead_contact}
            gradient="linear-gradient(135deg, #6a1b9a, #9c27b0)"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Active Leads"
            value={lead_contact.total_lead_contact_active}
            icon={<Contacts sx={{ fontSize: 40 }} />}
            gradient="linear-gradient(135deg, #2e7d32, #66bb6a)"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Verified Leads"
            value={lead_contact.total_lead_contact_verified}
            icon={<Contacts sx={{ fontSize: 40 }} />}
            gradient="linear-gradient(135deg, #0288d1, #26c6da)"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Unverified Leads"
            value={lead_contact.total_lead_contact_unverified}
            icon={<Contacts sx={{ fontSize: 40 }} />}
            gradient="linear-gradient(135deg, #c62828, #ef5350)"
          />
        </Grid>
      </Grid>

      <Typography variant="h6" fontWeight="bold" mb={2}>
        Lead Campaigns
      </Typography>
      <Grid container spacing={3} mb={4} display="flex" justifyContent="center">
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Campaigns"
            value={lead_campaign.total_campaign}
            icon={<Campaign sx={{ fontSize: 40 }} />}
            gradient="linear-gradient(135deg, #1976d2, #64b5f6)"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Pending Campaigns"
            value={lead_campaign.total_campaign_pending}
            icon={<Campaign sx={{ fontSize: 40 }} />}
            gradient="linear-gradient(135deg, #9e9d24, #cddc39)"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Queued Campaigns"
            value={lead_campaign.total_campaign_queued}
            icon={<Campaign sx={{ fontSize: 40 }} />}
            gradient="linear-gradient(135deg, #512da8, #9575cd)"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Active Campaigns"
            value={lead_campaign.total_campaign_active}
            icon={<Campaign sx={{ fontSize: 40 }} />}
            gradient="linear-gradient(135deg, #2e7d32, #81c784)"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Cancelled Campaigns"
            value={lead_campaign.total_campaign_cancelled}
            icon={<Campaign sx={{ fontSize: 40 }} />}
            gradient="linear-gradient(135deg, #c62828, #e57373)"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Completed Campaigns"
            value={lead_campaign.total_campaign_completed}
            icon={<Campaign sx={{ fontSize: 40 }} />}
            gradient="linear-gradient(135deg, #00695c, #26a69a)"
          />
        </Grid>
      </Grid>

      <Typography variant="h6" fontWeight="bold" mb={2}>
        Email Queue
      </Typography>
      <Grid container spacing={3} mb={4} display="flex" justifyContent="center">
        <Grid item xs={12} md={3}>
          <StatCard
            title="Emails Pending"
            value={email_queue.total_email_queued_pending}
            icon={<Email sx={{ fontSize: 40 }} />}
            gradient="linear-gradient(135deg, #ff6f00, #ffa726)"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Emails Active"
            value={email_queue.total_email_queue_active}
            icon={<Email sx={{ fontSize: 40 }} />}
            gradient="linear-gradient(135deg, #0288d1, #29b6f6)"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Emails Sent"
            value={email_queue.total_email_queued_sent}
            icon={<Email sx={{ fontSize: 40 }} />}
            gradient="linear-gradient(135deg, #2e7d32, #81c784)"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Emails Failed"
            value={email_queue.total_email_queued_failed}
            icon={<Email sx={{ fontSize: 40 }} />}
            gradient="linear-gradient(135deg, #b71c1c, #ef5350)"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
