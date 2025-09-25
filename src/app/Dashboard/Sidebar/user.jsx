"use client";
import { useState } from "react";
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

export default function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      age: 35,
      status: "Active",
      createdOn: "2025-08-20",
      updatedOn: "2025-09-10",
      country: "Australia",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      age: 38,
      status: "Active",
      createdOn: "2025-08-20",
      updatedOn: "2025-09-10",
      country: "America",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      email: "michael@example.com",
      age: 40,
      status: "Active",
      createdOn: "2025-08-20",
      updatedOn: "2025-09-10",
      country: "Ireland",
    },
    {
      id: 4,
      firstName: "Emma",
      lastName: "Brown",
      email: "emma@example.com",
      age: 28,
      status: "Active",
      createdOn: "2025-08-20",
      updatedOn: "2025-09-10",
      country: "Canada",
    },
    {
      id: 5,
      firstName: "Liam",
      lastName: "Davis",
      email: "liam@example.com",
      age: 32,
      status: "Active",
      createdOn: "2025-08-20",
      updatedOn: "2025-09-10",
      country: "UK",
    },
    {
      id: 6,
      firstName: "Olivia",
      lastName: "Miller",
      email: "olivia@example.com",
      age: 29,
      status: "Active",
      createdOn: "2025-08-20",
      updatedOn: "2025-09-10",
      country: "Germany",
    },
    {
      id: 7,
      firstName: "Noah",
      lastName: "Wilson",
      email: "noah@example.com",
      age: 36,
      status: "Active",
      createdOn: "2025-08-20",
      updatedOn: "2025-09-10",
      country: "France",
    },
    {
      id: 8,
      firstName: "Sophia",
      lastName: "Taylor",
      email: "sophia@example.com",
      age: 31,
      status: "Active",
      createdOn: "2025-08-20",
      updatedOn: "2025-09-10",
      country: "Spain",
    },
    {
      id: 9,
      firstName: "James",
      lastName: "Anderson",
      email: "james@example.com",
      age: 45,
      status: "Active",
      createdOn: "2025-08-20",
      updatedOn: "2025-09-10",
      country: "Italy",
    },
    {
      id: 10,
      firstName: "Isabella",
      lastName: "Thomas",
      email: "isabella@example.com",
      age: 27,
      status: "Active",
      createdOn: "2025-08-20",
      updatedOn: "2025-09-10",
      country: "Japan",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");
  const [currentUser, setCurrentUser] = useState(null);

  const countries = ["All", ...new Set(users.map((u) => u.country))];

  const filteredUsers = users.filter((user) => {
    const matchesSearch = Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCountry =
      countryFilter === "All" || user.country === countryFilter;
    return matchesSearch && matchesCountry;
  });

  const handleEdit = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleSave = () => {
    setUsers(users.map((u) => (u.id === currentUser.id ? currentUser : u)));
    setOpen(false);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <Box>
      <Typography sx={{ fontSize: 25, fontWeight: "bold", mb: 2, mt: 1 }}>
        Users Data
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2, ml: 50 }}>
        <Typography variant="body1" sx={{ textAlign: "start" }}>
          Total result: {filteredUsers.length}
        </Typography>
        <TextField
          size="small"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Autocomplete
          size="small"
          options={countries}
          value={countryFilter}
          onChange={(e, newValue) => setCountryFilter(newValue || "All")}
          renderInput={(params) => <TextField {...params} label="Country" />}
          sx={{ minWidth: 200 }}
        />
        <Button variant="contained">Submit</Button>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
              }}
            >
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                ID
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                First Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Last Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Age
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Created On
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Updated On
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Country
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ fontSize: 12 }}>{user.id}</TableCell>
                <TableCell sx={{ fontSize: 12 }}>{user.firstName}</TableCell>
                <TableCell sx={{ fontSize: 12 }}>{user.lastName}</TableCell>
                <TableCell sx={{ fontSize: 12 }}>{user.email}</TableCell>
                <TableCell sx={{ fontSize: 12 }}>{user.age}</TableCell>
                <TableCell sx={{ fontSize: 12 }}>{user.status}</TableCell>
                <TableCell sx={{ fontSize: 12 }}>{user.createdOn}</TableCell>
                <TableCell sx={{ fontSize: 12 }}>{user.updatedOn}</TableCell>
                <TableCell sx={{ fontSize: 12 }}>{user.country}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(user)}>
                    <Image src="/edit.svg" alt="Edit" width={15} height={15} />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Image
                      src="/delete.svg"
                      alt="Delete"
                      width={15}
                      height={15}
                    />
                  </IconButton>
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
            value={currentUser?.firstName || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, firstName: e.target.value })
            }
          />
          <TextField
            label="Last Name"
            value={currentUser?.lastName || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, lastName: e.target.value })
            }
          />
          <TextField
            label="Email"
            value={currentUser?.email || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, email: e.target.value })
            }
          />
          <TextField
            label="Age"
            type="number"
            value={currentUser?.age || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, age: e.target.value })
            }
          />
          <TextField
            label="Status"
            value={currentUser?.status || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, status: e.target.value })
            }
          />
          <TextField
            label="Created On"
            type="date"
            value={currentUser?.createdOn || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, createdOn: e.target.value })
            }
          />
          <TextField
            label="Updated On"
            type="date"
            value={currentUser?.updatedOn || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, updatedOn: e.target.value })
            }
          />
          <TextField
            label="Country"
            value={currentUser?.country || ""}
            onChange={(e) =>
              setCurrentUser({ ...currentUser, country: e.target.value })
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
