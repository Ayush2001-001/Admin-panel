"use client";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import Image from "next/image";

export default function LeadContactsTable({
  contacts,
  filteredContacts,
  filteredUsers,
  filters,
  setFilters,
  setSearch,
  search,
  setOpen,
  setAddOpen,
  currentUser,
  setCurrentUser,
  updateContact,
  deleteContact,
  newContact,
  setnewContact,
  addContact,
  open,
  addOpen,
  handleImport,
}) {
  const { countries, designations, companies, businesses } = filters;

  const safeFilteredUsers = filteredUsers || filteredContacts || [];

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
            sx={{ textTransform: "none", fontSize: 12, height: 36, mr: 3 }}
          >
            Add Contact
          </Button>

          <Button
            variant="outlined"
            component="label"
            startIcon={
              <Image src="/import.svg" alt="Import" width={20} height={20} />
            }
            sx={{ textTransform: "none", fontSize: 12, height: 36, mr: 1 }}
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
          Total Results: {safeFilteredUsers.length}
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
          <Table stickyHeader size="small" sx={{ minWidth: 1300 }}>
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    backgroundColor: "primary.main",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "6px 8px",
                    whiteSpace: "nowrap",
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
                  "Phone",
                  "Status",
                  "Verified",
                  "Created At",
                  "Updated At",
                  "Actions",
                ].map((h) => (
                  <TableCell key={h}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredContacts.map((user, index) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f9faff" : "#fff",
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
                  <TableCell sx={{ fontSize: 11, py: 0.8 }}>
                    {user.phone}
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
                  <TableCell
                    sx={{ fontSize: 11, py: 0.8, textAlign: "center" }}
                  >
                    {user.is_verified ? "Yes" : "No"}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11, py: 0.8 }}>
                    {new Date(user.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11, py: 0.8 }}>
                    {new Date(user.updated_at).toLocaleString()}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 11, py: 0.8 }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        setCurrentUser(user);
                        setOpen(true);
                      }}
                    >
                      <Image
                        src="/edit.svg"
                        alt="Edit"
                        width={16}
                        height={16}
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
                        width={16}
                        height={16}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

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
          <Button onClick={() => setOpen(false)}>Cancel</Button>
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
          <Button onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button onClick={addContact} variant="contained">
            Add Lead Contact
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
