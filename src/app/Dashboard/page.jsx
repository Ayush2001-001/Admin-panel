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
} from "@mui/icons-material";

import { useRouter } from "next/navigation"; 
import Navbar from "../../components/Navbar";

import DashboardPage from "../../components/Dash";
import Users from "../user/page";
import LeadContact from "../lead_contact/page";
import LeadCampaigns from "../lead_campaign/page";
import EmailQueues from "../email_queue/page";
import Templates from "../template/page";
import Setting from "../setting/page";
import UnsubscribedEmails from "../unsubscribed_email/page";

const drawerWidth = 190;
const collapsedWidth = 60;

const menu = [
  { path: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { path: "users", label: "Users", icon: <People /> },
  { path: "lead_contacts", label: "Lead Contact", icon: <Contacts /> },
  { path: "lead_campaigns", label: "Lead Campaigns", icon: <Campaign /> },
  { path: "email_queues", label: "Email Queues", icon: <Email /> },
  {
    path: "unSubscribed_Emails",
    label: "Unsubscribed Emails",
    icon: <Email />,
  },
  { path: "templates", label: "Templates", icon: <Description /> },
  { path: "setting", label: "Setting", icon: <Settings /> },
];

function Sidebar({ open, selected, onSelect }) {
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
                onClick={() => onSelect(item.path)}
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

export default function DashboardLayout() {
  const [open] = useState(true);
  const [selected, setSelected] = useState("dashboard");
  const router = useRouter(); 
  const renderPage = () => {
    switch (selected) {
      case "users":
        return <Users />;
      case "lead_contacts":
        return <LeadContact />;
      case "lead_campaigns":
        return <LeadCampaigns />;
      case "email_queues":
        return <EmailQueues />;
      case "unSubscribed_Emails":
        return <UnsubscribedEmails />;
      case "templates":
        return <Templates />;
      case "setting":
        return <Setting />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Sidebar open={open} selected={selected} onSelect={setSelected} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {renderPage()}
      </Box>
    </Box>
  );
}
