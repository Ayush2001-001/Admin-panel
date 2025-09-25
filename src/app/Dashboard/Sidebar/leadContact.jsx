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
import { Business } from "@mui/icons-material";

export default function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      designation: "xyz",
      company: "tothebyte",
      business: "xyz",
      country: "Australia",
      createdAt: "2025-08-20",
      updatedAt: "2025-09-10",
      status: "Active",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      designation: "xyz",
      company: "tothebyte",
      business: "xyz",
      country: "America",

      createdAt: "2025-08-20",
      updatedAt: "2025-09-10",
      status: "Active",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      email: "michael@example.com",
      designation: "xyz",
      company: "tothebyte",
      business: "xyz",
      country: "Ireland",

      createdAt: "2025-08-20",
      updatedAt: "2025-09-10",
      status: "Active",
    },
    {
      id: 4,
      firstName: "Emma",
      lastName: "Brown",
      email: "emma@example.com",
      designation: "xyz",
      company: "tothebyte",
      business: "xyz",
      country: "Canada",

      createdAt: "2025-08-20",
      updatedAt: "2025-09-10",
      status: "Active",
    },
    {
      id: 5,
      firstName: "Liam",
      lastName: "Davis",
      email: "liam@example.com",
      designation: "xyz",
      company: "tothebyte",
      business: "xyz",
      country: "UK",

      createdAt: "2025-08-20",
      updatedAt: "2025-09-10",
      status: "Active",
    },
    {
      id: 6,
      firstName: "Olivia",
      lastName: "Miller",
      email: "olivia@example.com",
      designation: "xyz",
      company: "tothebyte",
      business: "xyz",
      country: "Germany",

      createdAt: "2025-08-20",
      updatedAt: "2025-09-10",
      status: "Active",
    },
    {
      id: 7,
      firstName: "Noah",
      lastName: "Wilson",
      email: "noah@example.com",
      designation: "xyz",
      company: "tothebyte",
      business: "xyz",
      country: "France",
      createdAt: "2025-08-20",
      updatedAt: "2025-09-10",
      status: "Active",
    },
    {
      id: 8,
      firstName: "Sophia",
      lastName: "Taylor",
      email: "sophia@example.com",
      designation: "xyz",
      company: "tothebyte",
      business: "xyz",
      country: "Spain",

      createdAt: "2025-08-20",
      updatedAt: "2025-09-10",
      status: "Active",
    },
    {
      id: 9,
      firstName: "James",
      lastName: "Anderson",
      email: "james@example.com",
      designation: "xyz",
      company: "tothebyte",
      business: "xyz",
      country: "Italy",

      createdAt: "2025-08-20",
      updatedAt: "2025-09-10",
      status: "Active",
    },
    {
      id: 10,
      firstName: "Isabella",
      lastName: "Thomas",
      email: "isabella@example.com",
      designation: "xyz",
      company: "tothebyte",
      business: "xyz",
      country: "Japan",
      createdAt: "2025-08-20",
      updatedAt: "2025-09-10",
      status: "Active",
    },
  ]);

  const today = () => new Date().toISOString().split("T")[0];

  const initialNewUser = {
    firstName: "",
    lastName: "",
    email: "",
    designation: "",
    company: "",
    country: "",
    createdAt: "",
    updatedAt: "",
    status: "Active",
  };

  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState(initialNewUser);
  const [designationFilter, setDesignationFilter] = useState(null);
  const [companyFilter, setCompanyFilter] = useState(null);
  const [businessFilter, setBusinessFilter] = useState(null);

  const countries = ["All", ...new Set(users.map((u) => u.country))];
  const designation = ["All", ...new Set(users.map((u) => u.designation))];
  const Company = ["All", ...new Set(users.map((u) => u.company))];
  const business = ["All", ...new Set(users.map((u) => u.business))];

  const filteredUsers = users.filter((user) => {
    const matchesSearch = Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCountry =
      countryFilter === "All" || user.country === countryFilter;
    const matchesDesignation =
      !designationFilter ||
      designationFilter === "All" ||
      user.designation === designationFilter;

    const matchesCompany =
      !companyFilter ||
      companyFilter === "All" ||
      user.company === companyFilter;

    const matchesBusiness =
      !businessFilter ||
      businessFilter === "All" ||
      user.business === businessFilter;
    return matchesSearch && matchesCountry;
    matchesDesignation && matchesCompany && matchesBusiness;
  });

  const handleEdit = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleSave = () => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, updatedAt: today() };
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setOpen(false);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleAddUser = () => {
    if (!newUser.firstName || !newUser.email) return;
    const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const newEntry = {
      id: nextId,
      firstName: newUser.firstName,
      lastName: newUser.lastName || "",
      email: newUser.email,
      designation: newUser.designation || "",
      company: newUser.company || "",
      business: newUser.business || "",

      country: newUser.country || "",
      createdAt: newUser.createdAt || today(),
      updatedAt: newUser.updatedAt || today(),
      status: newUser.status || "Active",
    };
    setUsers([...users, newEntry]);
    setNewUser(initialNewUser);
    setAddOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row" ,gap:2}}>
        <Typography sx={{ fontSize: 25, fontWeight: "bold", mb: 2, mt: 1 }}>
          Lead contact
        </Typography>
           <Button
          variant="contained"
           sx={{ marginLeft: 77, width:150, height: 40 }}
        >
        Import
        </Button>
        <Button
          variant="contained"
          sx={{ width:150, height: 40 }}
          onClick={() => setAddOpen(true)}
        >
          Add Contacts
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Typography
          variant="body1"
          sx={{ textAlign: "start", fontWeight: "bold" }}
        >
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
          options={designation}
          value={newUser.designation || "All"}
          onChange={(e, newValue) =>
            setNewUser({ ...newUser, designation: newValue })
          }
          renderInput={(params) => (
            <TextField {...params} label="Designation" />
          )}
          sx={{ minWidth:140}}
        />

        <Autocomplete
          size="small"
          options={Company}
          value={newUser.company || "All"}
          onChange={(e, newValue) =>
            setNewUser({ ...newUser, company: newValue })
          }
          renderInput={(params) => <TextField {...params} label="Company" />}
          sx={{ minWidth:140}}
        />

        <Autocomplete
          size="small"
          options={business}
          value={newUser.business || "All"}
          onChange={(e, newValue) =>
            setNewUser({ ...newUser, business: newValue })
          }
          renderInput={(params) => <TextField {...params} label="Business" />}
          sx={{ minWidth:140}}
        />
        <Autocomplete
          size="small"
          options={countries}
          value={countryFilter}
          onChange={(e, newValue) => setCountryFilter(newValue || "All")}
          renderInput={(params) => <TextField {...params} label="Country" />}
          sx={{ minWidth:140}}
        />

        <Button variant="contained">Search</Button>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  backgroundColor: "primary.main",
                  color: "white",
                  fontSize: 12,
                  // padding: "6px 10px",
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
                Designation
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Company
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Business
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Country
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Created At
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Updated At
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: 12 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell sx={{ padding: "6px 8px" }}>{user.id}</TableCell>
                <TableCell sx={{ padding: "6px 8px" }}>
                  {user.firstName}
                </TableCell>
                <TableCell sx={{padding: '4px 8px', fontSize: '0.8rem' }}>
                  {user.lastName}
                </TableCell>
                <TableCell sx={{padding: '4px 8px', fontSize: '0.8rem' }}>{user.email}</TableCell>
                <TableCell sx={{padding: '4px 8px', fontSize: '0.8rem' }}>
                  {user.designation}
                </TableCell>
                <TableCell sx={{padding: '4px 8px', fontSize: '0.8rem' }}>
                  {user.company}
                </TableCell>
                <TableCell sx={{padding: '4px 8px', fontSize: '0.8rem' }}>
                  {user.business}
                </TableCell>
                <TableCell sx={{padding: '4px 8px', fontSize: '0.8rem' }}>
                  {user.country}
                </TableCell>
                <TableCell sx={{padding: '4px 8px', fontSize: '0.8rem' }}>
                  {user.createdAt}
                </TableCell>
                <TableCell sx={{padding: '4px 8px', fontSize: '0.8rem' }}>
                  {user.updatedAt}
                </TableCell>
                <TableCell sx={{padding: '4px 8px', fontSize: '0.8rem' }}>
                  {user.status}
                </TableCell>
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
        <DialogContent>
          {currentUser && (
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
            >
              <TextField
                label="First Name"
                value={currentUser.firstName}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, firstName: e.target.value })
                }
              />
              <TextField
                label="Last Name"
                value={currentUser.lastName}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, lastName: e.target.value })
                }
              />
              <TextField
                label="Email"
                value={currentUser.email}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
              />
              <TextField
                label="Designation"
                value={currentUser.designation}
                onChange={(e) =>
                  setCurrentUser({
                    ...currentUser,
                    designation: e.target.value,
                  })
                }
              />
              <TextField
                label="Company"
                value={currentUser.company}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, company: e.target.value })
                }
              />
              <TextField
                label="Business"
                value={currentUser.business}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, business: e.target.value })
                }
              />
              <TextField
                label="Country"
                value={currentUser.country}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, country: e.target.value })
                }
              />
            </Box>
          )}
        </DialogContent>
        <TableCell>
          <IconButton onClick={() => handleEdit(user)}>
            <Image src="/edit.svg" alt="Edit" width={15} height={15} />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(user.id)}>
            <Image src="/delete.svg" alt="Delete" width={15} height={15} />
          </IconButton>
        </TableCell>
      </Dialog>

      <Dialog open={addOpen} onClose={() => setAddOpen(false)}>
        <DialogTitle>Add Contact</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1,width:500 }}
          >
            <TextField
              label="First Name"
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
            />
            <TextField
              label="Last Name"
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
            />
            <TextField
              label="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <Autocomplete
              size="small"
              options={designation}
              value={designationFilter}
              onChange={(e, newValue) => setDesignationFilter(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Designation" />
              )}
            />
            <Autocomplete
              size="small"
              options={Company}
              value={companyFilter}
              onChange={(e, newValue) => setCompanyFilter(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Company" />
              )}
            />
            <Autocomplete
              size="small"
              options={business}
              value={businessFilter}
              onChange={(e, newValue) => setBusinessFilter(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Business" />
              )}
            />
            <TextField
              label="Country"
              value={newUser.country}
              onChange={(e) =>
                setNewUser({ ...newUser, country: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddUser}>Add Contact</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
