"use client";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import Image from "next/image";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Navbar() {

    const [isSignIn, setIsSignIn] = useState(false);

    const router = useRouter();

   const handleLogout = () => {
      Cookies.remove("token");
      setIsSignIn(false);
      router.push("/");
    };
  return (
    <AppBar
      position="fixed"
      elevation={0} 
      sx={{
        backgroundColor:"#a5c6e7ff",
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
          <Button  onClick={handleLogout}variant="contained" color="error">
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
