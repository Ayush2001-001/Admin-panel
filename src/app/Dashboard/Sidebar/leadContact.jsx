"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

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

export default function contacts() {
  const [contacts, setcontacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");
  const [designationFilter, setDesignationFilter] = useState(null);
  const [companyFilter, setCompanyFilter] = useState(null);
  const [businessFilter, setBusinessFilter] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [newContact, setnewContact] = useState({
    first_name: "",
    last_name: "",
    email: "",
    designation: "",
    company: "",
    business: "",
    country: "",
    phone: "",
  });

  const token = "YOUR_TOKEN";

  const fetchContacts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_contacts/?skip=0&limit=50`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            accept: "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success) setcontacts(data.data || []);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  const handleAddContact = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_contacts/`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify(newContact),
        }
      );
      setnewContact({   
        first_name: "",
        last_name: "",
        email: "",
        designation: "",
        company: "",
        business: "",
        country: "",
        phone: "",
      });
      setAddOpen(false);
      fetchContacts();
    } catch (err) {
      console.error("Error adding contact:", err);
    }
  };

  const updateContact = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_contacts/${currentUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify(currentUser),
        }
      );
      setOpen(false);
      fetchContacts();
    } catch (err) {
      console.error("Error updating contact:", err);
    }
  };

  const deleteContact = async (id) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_contacts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            accept: "application/json",
          },
        }
      );

      fetchContacts();
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredcontacts = contacts.filter((user) => {
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

    return (
      matchesSearch &&
      matchesCountry &&
      matchesDesignation &&
      matchesCompany &&
      matchesBusiness
    );
  });

  const filteredUsers = contacts.filter((u) => {
    const matchesSearch = Object.values(u)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSearch;
  });

  const countries = ["All", ...new Set(contacts.map((u) => u.country))];
  const designations = ["All", ...new Set(contacts.map((u) => u.designation))];
  const companies = ["All", ...new Set(contacts.map((u) => u.company))];
  const businesses = ["All", ...new Set(contacts.map((u) => u.business))];

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Typography sx={{ fontSize: 25, fontWeight: "bold", mb: 2, mt: 1 }}>
          Lead Contacts
        </Typography>
        <Button
          variant="contained"
          sx={{ marginLeft: "auto", width: 150, height: 35 }}
          onClick={() => setAddOpen(true)}
        >
          Add Contact
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: "auto", width: 150, height: 35 }}
        >
          Import
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Typography variant="body1">
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
          options={designations}
          value={designationFilter || "All"}
          onChange={(e, v) => setDesignationFilter(v)}
          renderInput={(params) => (
            <TextField {...params} label="Designation" />
          )}
          sx={{ minWidth: 140 }}
        />
        <Autocomplete
          size="small"
          options={companies}
          value={companyFilter || "All"}
          onChange={(e, v) => setCompanyFilter(v)}
          renderInput={(params) => <TextField {...params} label="Company" />}
          sx={{ minWidth: 140 }}
        />
        <Autocomplete
          size="small"
          options={businesses}
          value={businessFilter || "All"}
          onChange={(e, v) => setBusinessFilter(v)}
          renderInput={(params) => <TextField {...params} label="Business" />}
          sx={{ minWidth: 140 }}
        />
        <Autocomplete
          size="small"
          options={countries}
          value={countryFilter}
          onChange={(e, v) => setCountryFilter(v || "All")}
          renderInput={(params) => <TextField {...params} label="Country" />}
          sx={{ minWidth: 140 }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  backgroundColor: "primary.main",
                  color: "white",
                  fontSize: 11,
                  padding: "6px 10px",
                  fontWeight: "bold",
                },
              }}
            >
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Business</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Is Verified</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredcontacts.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.designation}</TableCell>
                <TableCell>{user.company}</TableCell>
                <TableCell>{user.business}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.is_verified ? "Yes" : "No"}</TableCell>
                <TableCell>{user.created_at}</TableCell>
                <TableCell>{user.updated_at}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setCurrentUser(user);
                      setOpen(true);
                    }}
                  >
                    <Image src="/edit.svg" alt="Edit" width={15} height={15} />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => deleteContact(user.id)}
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
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent>
          {currentUser && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
            >
              <TextField
                label="First Name"
                value={currentUser.first_name}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, first_name: e.target.value })
                }
              />
              <TextField
                label="Last Name"
                value={currentUser.last_name}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, last_name: e.target.value })
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
              <TextField
                label="Phone"
                value={currentUser.phone}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, phone: e.target.value })
                }
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={updateContact} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addOpen} onClose={() => setAddOpen(false)}>
        <DialogTitle>Add Contact</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="First Name"
              value={newContact.first_name}
              onChange={(e) =>
                setnewContact({ ...newContact, first_name: e.target.value })
              }
            />
            <TextField
              label="Last Name"
              value={newContact.last_name}
              onChange={(e) =>
                setnewContact({ ...newContact, last_name: e.target.value })
              }
            />
            <TextField
              label="email"
              value={newContact.email}
              onChange={(e) =>
                setnewContact({ ...newContact, email: e.target.value })
              }
            />
            <Autocomplete
              size="small"
              options={designations}
              value={designationFilter}
              onChange={(e) =>
                setnewContact({ ...newContact, designation: e.target.value })
              }
              renderInput={(params) => (
                <TextField {...params} label="designation" />
              )}
            />
            <Autocomplete
              size="small"
              options={companies}
              value={companyFilter}
              onChange={(e) =>
                setnewContact({ ...newContact, company: e.target.value })
              }
              renderInput={(params) => (
                <TextField {...params} label="company" />
              )}
            />
            <Autocomplete
              size="small"
              options={businesses}
              value={businessFilter}
              onChange={(e) =>
                setnewContact({ ...newContact, business: e.target.value })
              }
              renderInput={(params) => (
                <TextField {...params} label="business" />
              )}
            />
            <Autocomplete
              size="small"
              options={countries}
              value={countryFilter}
              onChange={(e) =>
                setnewContact({ ...newContact, country: e.target.value })
              }
              renderInput={(params) => (
                <TextField {...params} label="country" />
              )}
            />
            <TextField
              label="phone"
              value={newContact.phone}
              onChange={(e) =>
                setnewContact({ ...newContact, phone: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button onClick={handleAddContact} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
