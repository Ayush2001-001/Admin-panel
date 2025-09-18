"use client";
import { useState } from "react";
import {Box,Table,TableHead,TableRow,TableCell,TableBody,Paper,TableContainer,Button,Dialog,DialogTitle,DialogContent,TextField,DialogActions,Typography,IconButton,Menu,MenuItem,} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function Users() {
  const [users, setUsers] = useState([
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", age: 35, country: "Australia" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", age: 38, country: "America" },
    { id: 3, firstName: "Michael", lastName: "Johnson", email: "michael@example.com", age: 40, country: "Ireland" },
    { id: 4, firstName: "Emma", lastName: "Brown", email: "emma@example.com", age: 28, country: "Canada" },
    { id: 5, firstName: "Liam", lastName: "Davis", email: "liam@example.com", age: 32, country: "UK" },
    { id: 6, firstName: "Olivia", lastName: "Miller", email: "olivia@example.com", age: 29, country: "Germany" },
    { id: 7, firstName: "Noah", lastName: "Wilson", email: "noah@example.com", age: 36, country: "France" },
    { id: 8, firstName: "Sophia", lastName: "Taylor", email: "sophia@example.com", age: 31, country: "Spain" },
    { id: 9, firstName: "James", lastName: "Anderson", email: "james@example.com", age: 45, country: "Italy" },
    { id: 10, firstName: "Isabella", lastName: "Thomas", email: "isabella@example.com", age: 27, country: "Japan" },
  ]);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [countryFilter, setCountryFilter] = useState("");

  const filteredUsers = users.filter((user) => {
    const matchesSearch = Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCountry = countryFilter ? user.country === countryFilter : true;

    return matchesSearch && matchesCountry;
  });

  const handleEdit = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleSave = () => {
    setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)));
    setOpen(false);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const countries = [...new Set(users.map((u) => u.country))];

  return (
    <Box sx={{ gap: 5 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>Users Data</Typography>

        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 2,
            position: "sticky",
            top: 0,
            zIndex: 1,
            backgroundColor: "white",
          }}
        />

        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <FilterListIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => { setCountryFilter(""); setAnchorEl(null); }}>
            All Countries
          </MenuItem>
          {countries.map((country) => (
            <MenuItem
              key={country}
              onClick={() => { setCountryFilter(country); setAnchorEl(null); }}
            >
              {country}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 515 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleEdit(user)} variant="outlined">
                    Edit
                  </Button>
                  <Button size="small" color="error" onClick={() => handleDelete(user.id)} sx={{ ml: 1 }} variant="outlined">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1, width: 500 }}>
          <TextField
            label="First Name"
            value={currentUser?.firstName || ""}
            onChange={(e) => setCurrentUser({ ...currentUser, firstName: e.target.value })}
          />
          <TextField
            label="Last Name"
            value={currentUser?.lastName || ""}
            onChange={(e) => setCurrentUser({ ...currentUser, lastName: e.target.value })}
          />
          <TextField
            label="Email"
            value={currentUser?.email || ""}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
          />
          <TextField
            label="Age"
            type="number"
            value={currentUser?.age || ""}
            onChange={(e) => setCurrentUser({ ...currentUser, age: e.target.value })}
          />
          <TextField
            label="Country"
            value={currentUser?.country || ""}
            onChange={(e) => setCurrentUser({ ...currentUser, country: e.target.value })}
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
