"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(" http://52.65.149.36:8000/api/auth/signin", 
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
     
      if (!res.ok) {
        throw new Error(data.detail || "Invalid credentials");
      }

      Cookies.set("token", data.data.access_token);

      toast.success("Login successful", { position: "top-right" });

      setTimeout(() => {
        router.push("/Dashboard");
      },1000); 
    } catch (err) {
      toast.error(err.message || "Something went wrong ", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, rgba(58,123,213,0.4), rgba(0,210,255,0.4))",
        }}
      >
        <Card
          variant="outlined"
          sx={{ width: "100%", maxWidth: 400, p: 3, borderRadius: 3 }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Image src="/logo.svg" alt="Logo" width={120} height={90} />

            <Typography variant="h5" sx={{ mt: 1, fontWeight: "bold" }}>
              Login
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3 }}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
