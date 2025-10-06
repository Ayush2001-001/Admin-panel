"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Typography,
  Autocomplete,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import Cookies from "js-cookie";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me/`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        const data = await res.json();
        setUsers([data.data]);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    user();
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchesSearch = Object.values(u)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSearch;
  });

  const handleEdit = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleSave = () => {
    setUsers(users.map((u) => (u.id === currentUser.id ? currentUser : u)));
    setOpen(false);
  };

  // const handleDelete = (id) => {
  //   setUsers(users.filter((u) => u.id !== id));
  // };

  return (
    <Box>
      <Typography sx={{ fontSize: 25, fontWeight: "bold", mb: 2, mt: 1 }}>
        Users Data
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2, ml: 50 }}>
        <Typography variant="body1">
          Total result: {filteredUsers.length}
        </Typography>
        <TextField
          size="small"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained">Search</Button>
        <Button variant="contained">Reset</Button>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                "& th": { backgroundColor: "primary.main", color: "white" },
              }}
            >
              <TableCell  sx={{ fontWeight: "bold", fontSize: 12 }}>ID</TableCell>
              <TableCell  sx={{ fontWeight: "bold", fontSize: 12 }}>First Name</TableCell>
              <TableCell  sx={{ fontWeight: "bold", fontSize: 12 }}>Last Name</TableCell>
              <TableCell  sx={{ fontWeight: "bold", fontSize: 12 }}>Email</TableCell>
              <TableCell  sx={{ fontWeight: "bold", fontSize: 12 }}>Role</TableCell>
              <TableCell  sx={{ fontWeight: "bold", fontSize: 12 }}>Status</TableCell>
              <TableCell  sx={{ fontWeight: "bold", fontSize: 12 }}>Is Verified</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.map((u) => (
              <TableRow key={u.id}>
                <TableCell sx={{ fontSize: 12 }}>{u.id}</TableCell>
                <TableCell sx={{ fontSize: 12 }}>{u.first_name}</TableCell>
                <TableCell sx={{ fontSize: 12 }}>{u.last_name}</TableCell>
                <TableCell sx={{ fontSize: 12 }}>{u.email}</TableCell>
                <TableCell sx={{ fontSize: 12 }}>{u.role}</TableCell>
                <TableCell sx={{ fontSize: 12 }}>{u.status}</TableCell>
                <TableCell sx={{ fontSize: 12 }}>{u.is_verified ? "True" : "False"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(u)}>
                    <Image src="/edit.svg" alt="Edit" width={15} height={15} />
                  </IconButton>
                  {/* <IconButton color="error" onClick={() => handleDelete(u.id)}>
                    <Image
                      src="/delete.svg"
                      alt="Delete"
                      width={15}
                      height={15}
                    />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
            width: 400,
          }}
        >
          <TextField
            label="First Name"
            value={currentUser?.first_name || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, first_name: e.target.value })
            }
          />
          <TextField
            label="Last Name"
            value={currentUser?.last_name || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, last_name: e.target.value })
            }
          />  
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
