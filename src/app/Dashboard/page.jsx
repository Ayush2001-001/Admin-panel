"use client";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Navbar from "./Navbar/page";
import Users from "./Sidebar/User";
import LeadContact from "./Sidebar/LeadContact";
import LeadCampaigns from "./Sidebar/LeadCampaigns";
import EmailQueues from "./Sidebar/EmailQues";
import Templates from "./Sidebar/Templates";
import Setting from "./Sidebar/Setting";
import { useState } from "react";

const drawerWidth = 190;
const menu = [
  { id: "users", label: "Users" },
  { id: "leadContact", label: "Lead Contact" },
  { id: "leadCampaigns", label: "Lead Campaigns" },
  { id: "emailQueues", label: "Email Queues" },
  { id: "templates", label: "Templates" },
  { id: "setting", label: "Setting" },
];

export default function Dashboard() {
  const [selected, setSelected] = useState("dashboard");

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "100%", position: "fixed", top: 0, zIndex: 1201 }}>
        <Navbar />
      </Box>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "13vh",
          },
        }}
      >
        <List>
          {menu.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                selected={selected === item.id}
                onClick={() => setSelected(item.id)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor:  "#1565C0",
                    color: "white",
                    "&:hover": { backgroundColor: "#4879b1ff" },
                  },
                }}
              >
                <ListItemText primary={item.label} sx={{ fontWeight: "bold" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "13vh" }}>
        {selected === "dashboard" && <h1>Welcome to Dashboard</h1>}
        {selected === "users" && <Users />}
        {selected === "leadContact" && <LeadContact />}
        {selected === "leadCampaigns" && <LeadCampaigns />}
        {selected === "emailQueues" && <EmailQueues />}
        {selected === "templates" && <Templates />}
        {selected === "setting" && <Setting />}
      </Box>
    </Box>
  );
}
