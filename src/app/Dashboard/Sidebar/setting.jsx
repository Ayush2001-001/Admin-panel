"use client";

import { useState } from "react";
import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableBody,
} from "@mui/material";
import Link from "next/link";

export default function Setting() {
  const [users, setUsers] = useState([
    // { id: 1, name: "Ayush", value: "Value A" },
    // { id: 2, name: "Sandeep", value: "Value B" },
    // { id: 3, name: "Kaif", value: "Value C" },
  ]);

  return (
    <Box>
      <Typography sx={{ fontSize: 25, fontWeight: "bold", mb: 2, mt: 1 }}>
        Setting
      </Typography>
      {/* <Link href={/Setting}>Setting</Link> */}
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader> 
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  backgroundColor: "primary.main",
                  color: "white",
                  fontSize: 12,
                },
              }}
            >
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}