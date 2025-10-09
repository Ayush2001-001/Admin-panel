"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import UsersTable from "../../Table/usersTable";
import { fetchCurrentUser } from "../../../Api/usersApi";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchCurrentUser();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadUser();
  }, []);

  const filteredUsers = users.filter((u) =>
    Object.values(u).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleSave = () => {
    setUsers(users.map((u) => (u.id === currentUser.id ? currentUser : u)));
    setOpen(false);
  };

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

      <UsersTable users={filteredUsers} onEdit={handleEdit} />

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
