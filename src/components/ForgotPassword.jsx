"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import ROUTES from "../app/Routes";
import { forgotPassword } from "../app/api/Auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      toast.success("We've sent a link to reset your password");
      setEmail("");
    } catch (err) {
      toast.error(err.message || "Failed to send link");
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
        <Card sx={{ width: "100%", maxWidth: 400, p: 3, borderRadius: 3 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Forgot Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Send"}
              </Button>
              <Typography sx={{ mt: 2 }}>
                <a href={ROUTES.LOGIN} style={{ color: "#1976d2" }}>
                  Back to Login
                </a>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
