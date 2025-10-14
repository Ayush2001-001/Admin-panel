"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Switch, CircularProgress } from "@mui/material";
import SettingsTable from "../../Table/settingsTable";
import { fetchSettingsApi } from "../../../Api/settingsApi";

export default function Setting() {
  const [settings, setSettings] = useState([]);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true); 
        const res = await fetchSettingsApi();

        if (res?.data) {
          setSettings(res.data);

          const leadSetting = res.data.find(
            (item) => item.setting_key === "lead_email_enabled"
          );
          setEmailEnabled(leadSetting?.setting_value === "true");
        }
      } catch (err) {
        console.error("Error loading settings:", err);
      } finally {
        setLoading(false); 
      }
    };

    loadSettings();
  }, []);

  const updatedSettings = settings.map((item) => {
    if (item.setting_key === "lead_email_enabled") {
      return {
        ...item,
        setting_value: emailEnabled ? "true" : "false",
      };
    } else {
      return item;
    }
  });

  if (loading) {
    return (
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        sx={{
          fontSize: 22,
          fontWeight: "bold",
          mb: 2,
          color: "primary.main",
        }}
      >
        Settings
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Typography sx={{ fontSize: 13 }}>Lead Email Sending:</Typography>
        <Switch checked={emailEnabled} color="primary" disabled />
        <Typography
          sx={{
            fontSize: 13,
            color: emailEnabled ? "green" : "red",
            fontWeight: 600,
          }}
        >
          {emailEnabled ? "Enabled" : "Disabled"}
        </Typography>
      </Box>

      <SettingsTable settings={updatedSettings} />
    </Box>
  );
}
