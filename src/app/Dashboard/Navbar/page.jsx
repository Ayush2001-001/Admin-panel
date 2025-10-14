"use client";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/");
  };

  return (
    <AppBar
      position="fixed"
      elevation={3}
      sx={{
        background: "linear-gradient(90deg, #0D47A1 0%, #1976D2 100%)",
        height: "70px",
        justifyContent: "center",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/dashboard")}
          >
            <Image src="/logo.svg" alt="Company Logo" width={50} height={50} />
          </motion.div>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              letterSpacing: 1,
              color: "white",
              textTransform: "uppercase",
            }}
          >
            iNexterp Dashboard
          </Typography>
        </Box>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
            sx={{
              px: 3,
              py: 1,
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            Logout
          </Button>
        </motion.div>
      </Toolbar>
    </AppBar>
  );
}
