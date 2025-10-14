"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Switch } from "@mui/material";
import SettingsTable from "../../Table/settingsTable";
import { fetchSettingsApi, switchSettingApi } from "../../../Api/settingsApi";

export default function Setting() {
  const [settings, setSettings] = useState([]);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadSettings = async () => {
    try {
      const json = await fetchSettingsApi();
      if (json && Array.isArray(json.data)) {
        setSettings(json.data);
        const leadSetting = json.data.find(
          (item) => item.setting_key === "lead_email_enabled"
        );
        setEmailEnabled(leadSetting?.setting_value === "true");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleToggleEmail = async () => {
    setLoading(true);
    try {
      await switchSettingApi(emailEnabled);
      setEmailEnabled(!emailEnabled);
      loadSettings();
    } catch (err) {
      console.error(err);
      alert("Failed to update setting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        sx={{ fontSize: 22, fontWeight: "bold", mb: 2, color: "primary.main" }}
      >
        Settings
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Typography sx={{ fontSize: 13 }}>Lead Email Sending:</Typography>
        <Switch
          checked={emailEnabled}
          onChange={handleToggleEmail}
          color="primary"
          disabled={loading}
        />
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

      <SettingsTable settings={settings} />
    </Box>
  );
}
