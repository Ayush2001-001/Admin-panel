"use client";
import { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import LeadContactsTable from "../table/LeadContactTable";
import {
  fetchLeadContacts,
  importLeadContacts,
  addLeadContact,
  updateLeadContact,
  deleteLeadContact,
} from "../api/LeadContactApi";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    countryFilter: "All",
    designationFilter: "All",
    companyFilter: "All",
    businessFilter: "All",
    countries: [],
    designations: [],
    companies: [],
    businesses: [],
  });
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newContact, setnewContact] = useState({});
  const [loading, setLoading] = useState(true);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const res = await fetchLeadContacts();
      if (!res.success) return;

      const data = res.data || [];
      setContacts(data);

      const unique = (key) => ["All", ...new Set(data.map((u) => u[key]))];
      setFilters((f) => ({
        ...f,
        countries: unique("country"),
        designations: unique("designation"),
        companies: unique("company"),
        businesses: unique("business"),
      }));
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const filteredContacts = contacts.filter((u) =>
    Object.values(u).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateLeadContact(currentUser.id, currentUser);
      await loadContacts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleAdd = async () => {
    try {
      setLoading(true);
      await addLeadContact(newContact);
      await loadContacts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setAddOpen(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteLeadContact(id);
      await loadContacts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (file) => {
    try {
      setLoading(true);
      await importLeadContacts(file);
      await loadContacts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "75vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <LeadContactsTable
      contacts={contacts}
      filteredContacts={filteredContacts}
      filters={filters}
      setFilters={setFilters}
      search={search}
      setSearch={setSearch}
      open={open}
      setOpen={setOpen}
      addOpen={addOpen}
      setAddOpen={setAddOpen}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      newContact={newContact}
      setnewContact={setnewContact}
      updateContact={handleUpdate}
      deleteContact={handleDelete}
      addContact={handleAdd}
      handleImport={handleImport}
    />
  );
}
