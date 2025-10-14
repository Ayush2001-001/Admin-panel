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
  TablePagination,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  Typography,
  Grid,
} from "@mui/material";
import Image from "next/image";

export default function LeadContactsTable({
  contacts,
  filteredContacts,
  filters,
  setFilters,
  search,
  setSearch,
  open,
  setOpen,
  addOpen,
  setAddOpen,
  currentUser,
  setCurrentUser,
  newContact,
  setnewContact,
  updateContact,
  deleteContact,
  addContact,
  handleImport,
}) {
  const { countries, designations, companies, businesses } = filters;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [viewUser, setViewUser] = useState(null);
  const [openView, setOpenView] = useState(false);

  const paginatedContacts = filteredContacts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography
          sx={{ fontSize: 22, fontWeight: 700, color: "primary.main" }}
        >
          Lead Contacts
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            variant="contained"
            startIcon={
              <Image src="/add.svg" alt="Add" width={20} height={20} />
            }
            onClick={() => setAddOpen(true)}
            sx={{ textTransform: "none", fontSize: 12, height: 36 }}
          >
            Add Lead Contact
          </Button>
          <Button
            variant="outlined"
            component="label"
            startIcon={
              <Image src="/import.svg" alt="Import" width={20} height={20} />
            }
            sx={{ textTransform: "none", fontSize: 12, height: 36 }}
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
          Total Results: {filteredContacts.length}
        </Typography>
        <TextField
          size="small"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        {[
          {
            label: "Designation",
            options: designations,
            key: "designationFilter",
          },
          { label: "Company", options: companies, key: "companyFilter" },
          { label: "Business", options: businesses, key: "businessFilter" },
          { label: "Country", options: countries, key: "countryFilter" },
        ].map(({ label, options, key }) => (
          <Autocomplete
            key={key}
            size="small"
            freeSolo
            options={options}
            value={filters[key] || "All"}
            onChange={(_e, v) => setFilters((p) => ({ ...p, [key]: v }))}
            renderInput={(params) => <TextField {...params} label={label} />}
            sx={{ minWidth: 150 }}
          />
        ))}
      </Box>

      <Paper
        sx={{ width: "100%", borderRadius: 3, boxShadow: 2, overflowX: "auto" }}
      >
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    backgroundColor: "primary.main",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "6px 8px",
                    textAlign: "center",
                  },
                }}
              >
                {[
                  "ID",
                  "First Name",
                  "Last Name",
                  "Email",
                  "Designation",
                  "Company",
                  "Business",
                  "Country",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <TableCell key={h}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedContacts.map((user, idx) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{
                    backgroundColor: idx % 2 === 0 ? "#f9faff" : "#fff",
                    "&:hover": { backgroundColor: "#e3f2fd" },
                  }}
                >
                  <TableCell
                    sx={{ fontSize: 11, py: 0.8, textAlign: "center" }}
                  >
                    {user.id}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11, py: 0.8 }}>
                    {user.first_name}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11, py: 0.8 }}>
                    {user.last_name}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11, py: 0.8 }}>
                    {user.email}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11, py: 0.8 }}>
                    {user.designation}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11, py: 0.8 }}>
                    {user.company}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11, py: 0.8 }}>
                    {user.business}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11, py: 0.8 }}>
                    {user.country}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: user.status === "Active" ? "green" : "red",
                      py: 0.8,
                      textAlign: "center",
                    }}
                  >
                    {user.status}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 11, py: 0.8 }}>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setViewUser(user);
                        setOpenView(true);
                      }}
                    >
                      <Image
                        src="/view.svg"
                        alt="View"
                        width={18}
                        height={18}
                      />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setCurrentUser(user);
                        setOpen(true);
                      }}
                    >
                      <Image
                        src="/edit.svg"
                        alt="Edit"
                        width={18}
                        height={18}
                      />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => deleteContact(user.id)}
                    >
                      <Image
                        src="/delete.svg"
                        alt="Delete"
                        width={18}
                        height={18}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredContacts.length}
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
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              { fontSize: 11 },
          }}
        />
      </Paper>

      <Dialog
        open={openView}
        onClose={() => setOpenView(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>View Contact</DialogTitle>
        <DialogContent dividers sx={{ maxHeight: 400, overflowY: "auto" }}>
          {viewUser &&
            Object.entries(viewUser).map(([key, value], index) => (
              <Grid
                container
                key={key}
                sx={{
                  py: 1.2,
                  px: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 1,
                  mb: 0.5,
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                }}
              >
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ fontWeight: 500, minWidth: 140 }}
                  >
                    {key.replace("_", " ").toUpperCase()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {["created_at", "updated_at"].includes(key) && value
                      ? new Date(value).toLocaleString()
                      : typeof value === "boolean"
                      ? value
                        ? "Yes"
                        : "No"
                      : value}
                  </Typography>
                </Grid>
              </Grid>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent dividers>
          {currentUser && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
            >
              {[
                "first_name",
                "last_name",
                "email",
                "phone",
                "company",
                "designation",
                "business",
                "country",
              ].map((field) => (
                <TextField
                  key={field}
                  label={field.replace("_", " ").toUpperCase()}
                  value={currentUser[field] || ""}
                  onChange={(e) =>
                    setCurrentUser((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                  fullWidth
                  size="small"
                />
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button onClick={updateContact} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Lead Contact</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            {[
              "first_name",
              "last_name",
              "email",
              "phone",
              "company",
              "designation",
              "business",
              "country",
            ].map((field) => (
              <TextField
                key={field}
                label={field.replace("_", " ").toUpperCase()}
                value={newContact[field] || ""}
                onChange={(e) =>
                  setnewContact((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                  }))
                }
                fullWidth
                size="small"
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddOpen(false)}>Close</Button>
          <Button onClick={addContact} variant="contained">
            Add Lead Contact
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
