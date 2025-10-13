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
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "linear-gradient(90deg, #0D47A1, #1976D2)",
        height: 70,
        justifyContent: "center",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/dashboard")}
          >
            <Image src="/logo.svg" alt="Logo" width={50} height={50} />
          </motion.div> */}
          <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
            Tothebyte
          </Typography>
        </Box>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
            sx={{
              textTransform: "none",
              borderRadius: "20px",
              fontWeight: 600,
            }}
          >
            Logout
          </Button>
        </motion.div>
      </Toolbar>
    </AppBar>
  );
}
