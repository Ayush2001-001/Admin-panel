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
  CircularProgress,
} from "@mui/material";
import UsersTable from "../table/UsersTable";
import { fetchCurrentUser } from "../../app/api/UsersApi";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadUser = async () => {
    try {
      setLoading(true);
      const data = await fetchCurrentUser();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    if (!currentUser || !currentUser.id) return;

    const updatedUsers = users.map((u) => {
      if (u.id === currentUser.id) {
        return currentUser;
      }
      return u;
    });

    setUsers(updatedUsers);

    setOpen(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleReset = async () => {
    setSearch("");
    loadUser();
  };

  return (
    <Box>
      <Typography sx={{ fontSize: 25, fontWeight: "bold", mb: 2, mt: 1 }}>
        Users Data
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
        <Typography variant="body1">
          Total result: {filteredUsers.length}
        </Typography>

        <TextField
          sx={{ ml: "auto" }}
          size="small"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <UsersTable users={filteredUsers} onEdit={handleEdit} />
      )}

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
