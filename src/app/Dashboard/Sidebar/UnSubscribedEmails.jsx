"use client";

import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchUnsubscribedEmails,
  addUnsubscribedEmail,
  deleteUnsubscribedEmail,
  importUnsubscribedEmails,
} from "../../../Api/unsubscribedEmailApi";
import UnsubscribedEmailsTable from "../../Table/unsubscribedEmailTable";

export default function UnsubscribedEmails() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newEmail, setNewEmail] = useState("");
  const [importFile, setImportFile] = useState(null);

  const loadData = async () => {
    try {
      const result = await fetchUnsubscribedEmails();
      setData(result);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddEmailClick = async () => {
    if (!newEmail) return toast.warning("Please enter an email");
    try {
      await addUnsubscribedEmail(newEmail);
      setNewEmail("");
      toast.success("Email added successfully!");
      loadData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add email");
    }
  };

  const handleDeleteClick = async (email) => {
    if (!confirm(`Delete ${email}?`)) return;
    try {
      await deleteUnsubscribedEmail(email);
      toast.success("Email deleted");
      loadData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete email");
    }
  };

  const handleImportClick = async () => {
    if (!importFile) return toast.warning("Please select a file first");
    try {
      await importUnsubscribedEmails(importFile);
      setImportFile(null);
      toast.success("File imported successfully!");
      loadData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to import file");
    }
  };

  const filteredData = data.filter((item) =>
    item.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 2 }}>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#1976d2", mb: 2 }}
      >
        Unsubscribed Emails
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          mb: 2,
          alignItems: "center",
        }}
      >
        <TextField
          size="small"
          label="Search by Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 250 }}
        />
        <TextField
          size="small"
          label="Add New Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          sx={{ minWidth: 250 }}
        />
        <Button
          variant="contained"
          size="small"
          onClick={handleAddEmailClick}
          sx={{ textTransform: "none" }}
        >
          Add
        </Button>
        <Button
          variant="outlined"
          component="label"
          size="small"
          sx={{ textTransform: "none" }}
        >
          Import
          <input
            type="file"
            hidden
            accept=".csv"
            onChange={(e) => setImportFile(e.target.files[0])}
          />
        </Button>
        {importFile && (
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={handleImportClick}
            sx={{ textTransform: "none" }}
          >
            Upload
          </Button>
        )}
      </Box>

      <UnsubscribedEmailsTable
        data={filteredData}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        filteredCount={filteredData.length}
        onDelete={handleDeleteClick}
      />
    </Box>
  );
}
