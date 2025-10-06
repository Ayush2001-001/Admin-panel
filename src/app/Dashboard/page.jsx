"use client";
import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Tooltip,
  Paper,
  InputBase,
} from "@mui/material";
import {
  Menu as MenuIcon,
  People,
  Contacts,
  Campaign,
  Email,
  Description,
  Settings,
  Dashboard as DashboardIcon,
  Unsubscribe,
} from "@mui/icons-material";

import Users from "./Sidebar/user";
import LeadContact from "./Sidebar/leadContact";
import LeadCampaigns from "./Sidebar/LeadCampaigns";
import EmailQueues from "./Sidebar/EmailQues";
import Templates from "./Sidebar/Templates";
import Setting from "./Sidebar/Setting";
import UnsubscribedEmails from "../Dashboard/Sidebar/UnSubscribedEmails"

const drawerWidth = 190;
const collapsedWidth = 60;

const menu = [
  { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { id: "users", label: "Users", icon: <People /> },
  { id: "leadContact", label: "Lead Contact", icon: <Contacts /> },
  { id: "leadCampaigns", label: "Lead Campaigns", icon: <Campaign /> },
  { id: "emailQueues", label: "Email Queues", icon: <Email /> },
  { id: "unSubscribedEmails", label: "Unsubscribed Emails", icon: <Email /> },

  { id: "templates", label: "Templates", icon: <Description /> },
  { id: "setting", label: "Setting", icon: <Settings /> },
];

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("dashboard");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* ✅ AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#1565C0",
          transition: "width 0.3s ease",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left: Toggle + Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setOpen(!open)}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              Dashboard
            </Typography>
          </Box>

          {/* Right: Avatar */}
          {/* <IconButton>
            <Avatar
              alt="User"
              src="/avatar.png"
              sx={{ width: 36, height: 36, bgcolor: "white", color: "#1565C0" }}
            />
          </IconButton> */}
        </Toolbar>
      </AppBar>

      {/* ✅ Collapsible Drawer */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          transition: "width 0.3s ease",
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : collapsedWidth,
            boxSizing: "border-box",
            transition: "width 0.3s ease",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <Divider />

        {/* Menu List */}
        <List>
          {menu.map((item) => (
            <Tooltip
              key={item.id}
              title={!open ? item.label : ""}
              placement="right"
              arrow
            >
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => setSelected(item.id)}
                  selected={selected === item.id}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    "&.Mui-selected": {
                      backgroundColor: "#1565C0",
                      color: "white",
                      "&:hover": { backgroundColor: "#4879b1ff" },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color: selected === item.id ? "white" : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>

      {/* ✅ Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          // ml: open ? `${drawerWidth}px` : `${collapsedWidth}px`,
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
          transition: "margin 0.3s ease",
        }}
      >
        <Toolbar />

        {selected === "dashboard" && <h1>Welcome to Dashboard</h1>}
        {selected === "users" && <Users />}
        {selected === "leadContact" && <LeadContact />}
        {selected === "leadCampaigns" && <LeadCampaigns />}
        {selected === "emailQueues" && <EmailQueues />}
        {selected === "unSubscribedEmails" && <UnsubscribedEmails />}
        {selected === "templates" && <Templates />}
        {selected === "setting" && <Setting />}
      </Box>
    </Box>
  );
}
