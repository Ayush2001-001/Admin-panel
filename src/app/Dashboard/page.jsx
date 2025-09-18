"use client";
import { Box,Drawer,List,ListItem,ListItemText,ListItemButton, Button,} from "@mui/material";
import Navbar from "./Navbar/page";
import Users from "./Sidebar/User";
import LeadContact from "./Sidebar/LeadContact";
import LeadCampaigns from "./Sidebar/LeadCampaigns"
import EmailQueues from "./Sidebar/EmailQues";
import Templates from "./Sidebar/Templates";
import Setting from "./Sidebar/Setting";
import { useState } from "react";

const drawerWidth = 190;

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
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "13vh",
          },
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setSelected("users")}>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setSelected("leadContact")}>
              <ListItemText primary="Lead Contact" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setSelected("leadCompaigns")}>
              <ListItemText primary="Lead Campaigns" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setSelected("emailQueues")}>
              <ListItemText primary="Email Queues" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setSelected("templates")}>
              <ListItemText primary="Templates" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setSelected("setting")}>
              <ListItemText primary="Setting" />
            </ListItemButton>
          </ListItem>
        </List>
        </Drawer>
\
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "13vh",
        }}
      >
        {selected === "users" && <Users />}
        {selected === "leadContact" && <LeadContact />}
        {selected === "leadCompaigns" && <LeadCampaigns />}
        {selected === "emailQueues" && <EmailQueues />}
        {selected === "templates" && <Templates />}
        {selected === "setting" && <Setting />}
        {selected === "dashboard" &&
         <h1>Welcome to Dashboard</h1>}
      </Box>
    </Box>
  );
}
