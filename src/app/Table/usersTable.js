"use client";

import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, IconButton } from "@mui/material";
import Image from "next/image";

export default function UsersTable({ users, onEdit }) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ "& th": { backgroundColor: "primary.main", color: "white" } }}>
            <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>ID</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>First Name</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>Last Name</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>Role</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>Is Verified</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell sx={{ fontSize: 12 }}>{u.id}</TableCell>
              <TableCell sx={{ fontSize: 12 }}>{u.first_name}</TableCell>
              <TableCell sx={{ fontSize: 12 }}>{u.last_name}</TableCell>
              <TableCell sx={{ fontSize: 12 }}>{u.email}</TableCell>
              <TableCell sx={{ fontSize: 12 }}>{u.role}</TableCell>
              <TableCell sx={{ fontSize: 12 }}>{u.status}</TableCell>
              <TableCell sx={{ fontSize: 12 }}>{u.is_verified ? "True" : "False"}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(u)}>
                  <Image src="/edit.svg" alt="Edit" width={15} height={15} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
