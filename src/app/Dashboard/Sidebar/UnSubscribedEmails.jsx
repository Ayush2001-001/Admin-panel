"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UnsubscribedEmails() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newEmail, setNewEmail] = useState("");
  const [importFile, setImportFile] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/unsubscribed_emails/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const json = await res.json();
      setData(Array.isArray(json.data) ? json.data : json);
    } catch (err) {
      console.error("Error fetching unsubscribed emails:", err);
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddEmail = async () => {
    if (!newEmail) return toast.warning("Please enter an email");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/unsubscribed_emails/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({ email: newEmail }),
        }
      );

      if (res.ok) {
        setNewEmail("");
        toast.success("Email added successfully!");
        fetchData();
      } else {
        toast.error("Failed to add email");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding email");
    }
  };

  const handleImport = async () => {
    if (!importFile) return toast.warning("Please select a file first");
    const formData = new FormData();
    formData.append("file", importFile);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/unsubscribed_emails/import`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: formData,
        }
      );
      if (res.ok) {
        setImportFile(null);
        toast.success("File imported successfully!");
        fetchData();
      } else {
        toast.error("Failed to import file");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error during import");
    }
  };

  const handleDelete = async (email) => {
    if (!confirm(`Delete ${email}?`)) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/unsubscribed_emails/${email}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (res.ok) {
        toast.success("Email deleted");
        fetchData();
      } else {
        toast.error("Failed to delete email");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting email");
    }
  };

  const filteredData = data.filter((item) =>
    item.email?.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: 2 }}>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#1976d2",
          mb: 2,
        }}
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
          onClick={handleAddEmail}
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
            onClick={handleImport}
            sx={{ textTransform: "none" }}
          >
            Upload
          </Button>
        )}
      </Box>

      <Paper sx={{ borderRadius: 2, boxShadow: 2 }}>
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    backgroundColor: "#1976d2",
                    color: "white",
                    fontSize: 11,
                    padding: "6px 8px",
                  },
                }}
              >
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 2, fontSize: 12 }}>
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item, index) => (
                  <TableRow
                    key={item.id}
                    hover
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                      "&:hover": { backgroundColor: "#f1faff" },
                    }}
                  >
                    <TableCell sx={{ fontSize: 11 }}>{item.id}</TableCell>
                    <TableCell sx={{ fontSize: 11 }}>{item.email}</TableCell>
                    <TableCell sx={{ fontSize: 11 }}>
                      {new Date(item.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11 }}>
                      {new Date(item.updated_at).toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(item.email)}
                        sx={{ textTransform: "none", fontSize: 11 }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{
            "& .MuiTablePagination-toolbar": { minHeight: 36, fontSize: 11 },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
              fontSize: 11,
            },
          }}
        />
      </Paper>
    </Box>
  );
}
