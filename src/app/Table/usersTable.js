"use client";

import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import Image from "next/image";

export default function UsersTable({ users, onEdit }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", borderRadius: 2, boxShadow: 3 }}
    >
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  backgroundColor: "primary.main",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 11,
                  padding: "6px 8px",
                  whiteSpace: "nowrap",
                },
              }}
            >
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((u) => (
                <TableRow
                  key={u.id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ fontSize: 12, py: 0.9 }}>{u.id}</TableCell>
                  <TableCell sx={{ fontSize: 12, py: 0.9 }}>{u.first_name}</TableCell>
                  <TableCell sx={{ fontSize: 12, py: 0.9 }}>{u.last_name}</TableCell>
                  <TableCell sx={{ fontSize: 12, py: 0.9 }}>{u.email}</TableCell>
                  <TableCell sx={{ fontSize: 12, py: 0.9 }}>{u.role}</TableCell>
                  <TableCell sx={{ fontSize: 12, py: 0.9 }}>{u.status}</TableCell>
                  <TableCell sx={{ fontSize: 12, py: 0.9 }}>{u.is_verified ? "Yes" : "No"}</TableCell>
                  <TableCell sx={{ fontSize: 12, py: 0.9 }}>
                    <IconButton onClick={() => onEdit(u)}>
                      <Image
                        src="/edit.svg"
                        alt="Edit"
                        width={18}
                        height={18}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={users.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            { fontSize: 12 },
        }}
      />
    </Paper>
  );
}
