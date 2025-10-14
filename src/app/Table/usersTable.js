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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";

export default function UsersTable({ users, onEdit }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleView = (user) => setSelectedUser(user);
  const handleClose = () => setSelectedUser(null);

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: 3,
        }}
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
                    <TableCell sx={{ fontSize: 12, py: 0.9 }}>
                      {u.first_name}
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, py: 0.9 }}>
                      {u.last_name}
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, py: 0.9 }}>
                      {u.email}
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, py: 0.9 }}>
                      {u.role}
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, py: 0.9 }}>
                      {u.status}
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, py: 0.9 }}>
                      {u.is_verified ? "Yes" : "No"}
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, py: 0.9 }}>
                      <IconButton onClick={() => onEdit(u)}>
                        <Image
                          src="/edit.svg"
                          alt="Edit"
                          width={18}
                          height={18}
                        />
                      </IconButton>
                      <IconButton onClick={() => handleView(u)}>
                        <Image
                          src="/view.svg"
                          alt="View"
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

      <Dialog
        open={!!selectedUser}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>User Details</DialogTitle>
        <DialogContent dividers>
          {selectedUser &&
            Object.entries(selectedUser).map(([key, value], index) => (
              <Grid
                container
                key={key}
                sx={{
                  py: 1.2,
                  px: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 1,
                  mb: 0.5,
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                }}
              >
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ fontWeight: 500, minWidth: 160 }}
                  >
                    {key.replace("_", " ").toUpperCase()}
                  </Typography>
                </Grid>
                <Grid item>
                  {key === "status" ? (
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        px: 1.5,
                        py: 0.4,
                        borderRadius: 1,
                        color: "#fff",
                        backgroundColor: value === "Active" ? "green" : "red",
                      }}
                    >
                      {value}
                    </Typography>
                  ) : key === "email_template_group" ? (
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        px: 1.5,
                        py: 0.4,
                        borderRadius: 1,
                        backgroundColor: "#e0f2ff",
                        color: "#1976d2",
                      }}
                    >
                      {value}
                    </Typography>
                  ) : key === "created_at" || key === "updated_at" ? (
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {value ? new Date(value).toLocaleString() : ""}
                    </Typography>
                  ) : typeof value === "boolean" ? (
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {value ? "Yes" : "No"}
                    </Typography>
                  ) : (
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {value}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
