"use client";
import { useState } from "react";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
} from "@mui/material";
import {
  People,
  Contacts,
  Campaign,
  Email,
  Description,
  Settings,
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Users from "./Sidebar/user";
import LeadContact from "./Sidebar/leadContact";
import LeadCampaigns from "./Sidebar/LeadCampaigns";
import EmailQueues from "./Sidebar/EmailQues";
import Templates from "./Sidebar/Templates";
import Setting from "./Sidebar/Setting";
import UnsubscribedEmails from "./Sidebar/UnSubscribedEmails";
import DashboardPage from "./Sidebar/dash";

import Navbar from "./Navbar/page"

const drawerWidth = 190;
const collapsedWidth = 60;

const menu = [
  { path: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { path: "/users", label: "Users", icon: <People /> },
  { path: "/leadContact", label: "Lead Contact", icon: <Contacts /> },
  { path: "/leadCampaigns", label: "Lead Campaigns", icon: <Campaign /> },
  { path: "/emailQueues", label: "Email Queues", icon: <Email /> },
  {
    path: "/unSubscribedEmails",
    label: "Unsubscribed Emails",
    icon: <Email />,
  },
  { path: "/templates", label: "Templates", icon: <Description /> },
  { path: "/setting", label: "Setting", icon: <Settings /> },
];

function Sidebar({ open }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("/dashboard");

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          transition: "width 0.3s ease",
          overflowX: "hidden",
        },
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {menu.map((item) => (
          <Tooltip
            key={item.path}
            title={!open ? item.label : ""}
            placement="right"
            arrow
          >
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  setSelected(item.path);
                  navigate(item.path);
                }}
                selected={selected === item.path}
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
                    color: selected === item.path ? "white" : "inherit",
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
  );
}

function DashboardLayout() {
  const [open] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar /> 
      <Sidebar open={open} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
        }}
      >
        <Toolbar />

        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/leadContact" element={<LeadContact />} />
          <Route path="/leadCampaigns" element={<LeadCampaigns />} />
          <Route path="/emailQueues" element={<EmailQueues />} />
          <Route path="/unSubscribedEmails" element={<UnsubscribedEmails />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default function Dashboard() {
  return (
    <Router>
      <DashboardLayout />
    </Router>
  );
}
