"use client";
import { useState, useEffect } from "react";
import LeadContactsTable from "../../Table/leadContactTable";
import {
  fetchLeadContacts,
  importLeadContacts,
  addLeadContact,
  updateLeadContact,
  deleteLeadContact,
} from "../../../Api/leadContactApi";

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

  const loadContacts = async () => {
    try {
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
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const filteredContacts = contacts.filter((u) =>
    Object.values(u).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdate = async () => {
    await updateLeadContact(currentUser.id, currentUser);
    loadContacts();
    setOpen(false);
  };

  const handleAdd = async () => {
    await addLeadContact(newContact);
    loadContacts();
    setAddOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteLeadContact(id);
    loadContacts();
  };

  const handleImport = async (file) => {
    await importLeadContacts(file);
    loadContacts();
  };

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
