"use client";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import Image from "next/image";

export default function Navbar() {
  return (
    <AppBar
      position="fixed"
      elevation={0} 
      sx={{
        background: "linear-gradient(135deg, rgba(58,123,213,0.4), rgba(0,210,255,0.4))",
        height: "13vh",
        justifyContent: "center",
      }}
    >
      <Toolbar sx={{ display: "flex",
         justifyContent: "space-between" }}>
       
        <Box>
          <Image src="/logo.svg" 
          alt="Company Logo" 
          width={130}
           height={130} />
        </Box>

       
        <Box sx={{
           boxShadow:10,
           
        }}>
          <Button variant="contained" color="error">
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
