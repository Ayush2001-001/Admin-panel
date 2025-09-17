"use client";
import { Box, Drawer, List, ListItem, Toolbar, Typography,ListItemText } from "@mui/material";
import Navbar from "./Navbar/page";
import Users from "./Sidebar/user";
import LeadContact from "./Sidebar/leadContact";
import LeadCompaigns from "./Sidebar/leadCompaings";
import EmailQueues from "./Sidebar/emailQues";
import Templates from "./Sidebar/templates";
import Setting from "./Sidebar/setting";
import { useState } from "react";

const drawerWidth = 240;

export default function Dashboard() {
  const [selected, setSelected] = useState("dashboard");
  return (
    <Box sx={{ display: "flex" }}>
      
      <Box>
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

        <Box>
          <List>
            <ListItem button onClick={() => setSelected("users")}>  <ListItemText primary="Users" /></ListItem>
            <ListItem><LeadContact /></ListItem>
            <ListItem><LeadCompaigns /></ListItem>
            <ListItem><EmailQueues /></ListItem>
            <ListItem><Templates /></ListItem>
            <ListItem><Setting /></ListItem>
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "13vh",
          // marginLeft: `${drawerWidth}px`,
        }}
      >
        {selected === "users" ? <Users /> : <h2>Welcome to Dashboard</h2>}
      </Box>
    </Box>
  );
}
