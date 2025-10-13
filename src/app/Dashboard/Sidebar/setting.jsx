"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Switch } from "@mui/material";
import SettingsTable from "../../Table/settingsTable";
import { fetchSettingsApi } from "../../../Api/settingsApi";

export default function Setting() {
  const [settings, setSettings] = useState([]);
  const [emailEnabled, setEmailEnabled] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
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
      }
    };

    loadSettings();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        sx={{ fontSize: 22, fontWeight: "bold", mb: 2, color: "primary.main" }}
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

      <SettingsTable
        settings={settings.map((s) =>
          s.setting_key === "lead_email_enabled"
            ? { ...s, setting_value: emailEnabled ? "true" : "false" }
            : s
        )}
      />
    </Box>
  );
}
