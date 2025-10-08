"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Switch,
} from "@mui/material";

export default function Setting() {
  const [settings, setSettings] = useState([]);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/settings/`);
      const json = await res.json();
      if (json && Array.isArray(json.data)) {
        setSettings(json.data);
        const leadSetting = json.data.find(
          (item) => item.setting_key === "lead_email_enabled"
        );
        if (leadSetting)
          setEmailEnabled(leadSetting.setting_value === "true");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleToggleEmail = async () => {
    setLoading(true);
    try {
      const endpoint = emailEnabled
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/settings/stop_email`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/settings/start_email`;

      const res = await fetch(endpoint, { method: "GET" });
      if (res.ok) {
        setEmailEnabled(!emailEnabled);
        fetchSettings();
      } else {
        alert("Failed to update setting");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <Typography sx={{ fontSize: 13 }}>
          Lead Email Sending:
        </Typography>
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

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: "65vh",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  backgroundColor: "#1976d2",
                  color: "white",
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "6px 10px",
                  whiteSpace: "nowrap",
                },
              }}
            >
              <TableCell>ID</TableCell>
              <TableCell>Setting Key</TableCell>
              <TableCell>Setting Value</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {settings.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  align="center"
                  sx={{ fontSize: 12, py: 3 }}
                >
                  No settings found
                </TableCell>
              </TableRow>
            ) : (
              settings.map((item, i) => (
                <TableRow
                  key={item.id}
                  hover
                  sx={{
                    backgroundColor: i % 2 === 0 ? "#fafafa" : "white",
                    "&:hover": { backgroundColor: "#f4f8ff" },
                  }}
                >
                  <TableCell sx={{ fontSize: 11, padding: "5px 10px" }}>
                    {item.id}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11, padding: "5px 10px" }}>
                    {item.setting_key}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11, padding: "5px 10px" }}>
                    {item.setting_value}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
