"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import {Box,Card,  CardContent,  Typography,  TextField,  Button,} from "@mui/material";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Email:", email, "Password:", password);
    router.push("/Dashboard")
  };

  return ( 
<Box
      sx=
      {{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, rgba(58,123,213,0.4), rgba(0,210,255,0.4))",
        
      }}
    >
      
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 3,
          borderRadius: 7,
          boxShadow: 10,
          bgcolor: "#fff",
          backdropFilter: "blur(50px)",
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Image
            src="/logo.svg"
            alt="Company Logo"
            width={130}
            height={100}
            // priority
          />

          <Typography variant="h5" component="h2" align="center"  gutterBottom sx={{ mt: 1 ,fontWeight: 'bold'}}>
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              placeholder="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            //   required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              placeholder="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            //   required
            />
            <Button
             onClick={ handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
