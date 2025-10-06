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

  const handleImport = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_contacts/import`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (data.success) fetchContacts();
    } catch (err) {
      console.error("Error importing contacts:", err);
    }
  };

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
      console.log("Error fetching contacts:", err);
    }
  };

  const handleAddContact = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_contacts/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
      alert("Are you sure want to delete");
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
      <Box sx={{ p: 2 }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
    <Typography
      sx={{
        fontSize: 22,
        fontWeight: 700,
        color: "primary.main",
      }}
    >
      Lead Contacts
    </Typography>

    <Box sx={{ display: "flex", gap: 1.5 }}>
      <Button
        variant="contained"
        startIcon={<Image src="/add.svg" alt="Add" width={20} height={20} />}
        onClick={() => setAddOpen(true)}
        sx={{
          textTransform: "none",
          fontSize: 12,
          height: 36,
        }}
      >
        Add Contact
      </Button>

      <Button
        variant="outlined"
        component="label"
        startIcon={<Image src="/import.svg" alt="Import" width={20} height={20} />}
        sx={{
          textTransform: "none",
          fontSize: 12,
          height: 36,
        }}
      >
        Import CSV
        <input
          type="file"
          hidden
          accept=".csv"
          onChange={(e) => handleImport(e.target.files[0])}
        />
      </Button>
    </Box>
  </Box>

  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 1.5,
      mb: 2,
      alignItems: "center",
    }}
  >
    <Typography variant="body2" sx={{ fontWeight: 500 }}>
      Total Results: {filteredUsers.length}
    </Typography>

    <TextField
      size="small"
      label="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{ minWidth: 200 }}
    />

    <Autocomplete
      size="small"
      options={designations}
      value={designationFilter || "All"}
      onChange={(_e, v) => setDesignationFilter(v)}
      renderInput={(params) => <TextField {...params} label="Designation" />}
      sx={{ minWidth: 150 }}
    />

    <Autocomplete
      size="small"
      options={companies}
      value={companyFilter || "All"}
      onChange={(_e, v) => setCompanyFilter(v)}
      renderInput={(params) => <TextField {...params} label="Company" />}
      sx={{ minWidth: 150 }}
    />

    <Autocomplete
      size="small"
      options={businesses}
      value={businessFilter || "All"}
      onChange={(_e, v) => setBusinessFilter(v)}
      renderInput={(params) => <TextField {...params} label="Business" />}
      sx={{ minWidth: 150 }}
    />

    <Autocomplete
      size="small"
      options={countries}
      value={countryFilter || "All"}
      onChange={(_e, v) => setCountryFilter(v)}
      renderInput={(params) => <TextField {...params} label="Country" />}
      sx={{ minWidth: 150 }}
    />
  </Box>

  <TableContainer
    component={Paper}
    sx={{
      maxHeight: 420,
      borderRadius: 2,
      boxShadow: 1,
    }}
  >
    <Table stickyHeader size="small">
      <TableHead>
        <TableRow
          sx={{
            "& th": {
              backgroundColor: "primary.main",
              color: "#fff",
              fontSize: 11,
              fontWeight: 600,
              padding: "6px 8px",
              whiteSpace: "nowrap",
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
          <TableCell>Verified</TableCell>
          <TableCell>Created At</TableCell>
          <TableCell>Updated At</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {filteredcontacts.map((user) => (
          <TableRow
            key={user.id}
            hover
            sx={{
              "&:hover": { backgroundColor: "#f4f9ff" },
            }}
          >
            <TableCell sx={{ fontSize: 11 }}>{user.id}</TableCell>
            <TableCell sx={{ fontSize: 11 }}>{user.first_name}</TableCell>
            <TableCell sx={{ fontSize: 11 }}>{user.last_name}</TableCell>
            <TableCell sx={{ fontSize: 11 }}>{user.email}</TableCell>
            <TableCell sx={{ fontSize: 11 }}>{user.designation}</TableCell>
            <TableCell sx={{ fontSize: 11 }}>{user.company}</TableCell>
            <TableCell sx={{ fontSize: 11 }}>{user.business}</TableCell>
            <TableCell sx={{ fontSize: 11 }}>{user.country}</TableCell>
            <TableCell sx={{ fontSize: 11 }}>{user.phone}</TableCell>
            <TableCell
              sx={{
                fontSize: 11,
                color: user.status === "Active" ? "green" : "red",
                fontWeight: 600,
              }}
            >
              {user.status}
            </TableCell>
            <TableCell sx={{ fontSize: 11 }}>
              {user.is_verified ? "Yes" : "No"}
            </TableCell>
            <TableCell sx={{ fontSize: 11 }}>
              {new Date(user.created_at).toLocaleString()}
            </TableCell>
            <TableCell sx={{ fontSize: 11 }}>
              {new Date(user.updated_at).toLocaleString()}
            </TableCell>
            <TableCell align="center">
              <IconButton
                size="small"
                color="primary"
                onClick={() => {
                  setCurrentUser(user);
                  setOpen(true);
                }}
              >
                <Image src="/edit.svg" alt="Edit" width={16} height={16} />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => deleteContact(user.id)}
              >
                <Image src="/delete.svg" alt="Delete" width={16} height={16} />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
    <DialogTitle
      sx={{ fontWeight: 600, fontSize: 16, color: "primary.main" }}
    >
      Edit Contact
    </DialogTitle>
    <DialogContent>
      {currentUser && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {[
            "first_name",
            "last_name",
            "email",
            "designation",
            "company",
            "business",
            "country",
            "phone",
          ].map((field) => (
            <TextField
              key={field}
              label={field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              value={currentUser[field]}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, [field]: e.target.value })
              }
              size="small"
            />
          ))}
        </Box>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpen(false)} size="small">
        Cancel
      </Button>
      <Button variant="contained" size="small" onClick={updateContact}>
        Save
      </Button>
    </DialogActions>
  </Dialog>

  <Dialog open={addOpen} onClose={() => setAddOpen(false)} maxWidth="xs" fullWidth>
    <DialogTitle
      sx={{ fontWeight: 600, fontSize: 16, color: "primary.main" }}
    >
      Add Contact
    </DialogTitle>
    <DialogContent>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          size="small"
          label="First Name"
          value={newContact.first_name}
          onChange={(e) =>
            setnewContact({ ...newContact, first_name: e.target.value })
          }
        />
        <TextField
          size="small"
          label="Last Name"
          value={newContact.last_name}
          onChange={(e) =>
            setnewContact({ ...newContact, last_name: e.target.value })
          }
        />
        <TextField
          size="small"
          label="Email"
          value={newContact.email}
          onChange={(e) =>
            setnewContact({ ...newContact, email: e.target.value })
          }
        />
        <Autocomplete
          size="small"
          options={designations}
          value={newContact.designation}
          onChange={(_e, v) =>
            setnewContact({ ...newContact, designation: v || "" })
          }
          renderInput={(params) => (
            <TextField {...params} label="Designation" />
          )}
        />
        <Autocomplete
          size="small"
          options={companies}
          value={newContact.company}
          onChange={(_e, v) =>
            setnewContact({ ...newContact, company: v || "" })
          }
          renderInput={(params) => <TextField {...params} label="Company" />}
        />
        <Autocomplete
          size="small"
          options={businesses}
          value={newContact.business}
          onChange={(_e, v) =>
            setnewContact({ ...newContact, business: v || "" })
          }
          renderInput={(params) => <TextField {...params} label="Business" />}
        />
        <Autocomplete
          size="small"
          options={countries}
          value={newContact.country}
          onChange={(_e, v) =>
            setnewContact({ ...newContact, country: v || "" })
          }
          renderInput={(params) => <TextField {...params} label="Country" />}
        />
        <TextField
          size="small"
          label="Phone"
          value={newContact.phone}
          onChange={(e) =>
            setnewContact({ ...newContact, phone: e.target.value })
          }
        />
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setAddOpen(false)} size="small">
        Cancel
      </Button>
      <Button variant="contained" size="small" onClick={handleAddContact}>
        Add
      </Button>
    </DialogActions>
  </Dialog>
</Box>

  );
}
