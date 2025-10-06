"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TextField,
  Typography,
  Autocomplete,
  TablePagination,
} from "@mui/material";

export default function EmailQueues() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");
  const [designationFilter, setDesignationFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [businessFilter, setBusinessFilter] = useState("All");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_email_queues/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const json = await res.json();
        console.log("API Response:", json);

        setData(json.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const countries = ["All", ...new Set(data.map((i) => i.country))];
  const designations = ["All", ...new Set(data.map((i) => i.designation))];
  const companies = ["All", ...new Set(data.map((i) => i.company))];
  const businesses = ["All", ...new Set(data.map((i) => i.business))];

  const filteredData = data.filter((item) => {
    const matchesSearch = Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCountry =
      countryFilter === "All" || item.country === countryFilter;
    const matchesDesignation =
      designationFilter === "All" || item.designation === designationFilter;
    const matchesCompany =
      companyFilter === "All" || item.company === companyFilter;
    const matchesBusiness =
      businessFilter === "All" || item.business === businessFilter;

    return (
      matchesSearch &&
      matchesCountry &&
      matchesDesignation &&
      matchesCompany &&
      matchesBusiness
    );
  });

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#1976d2",
          mb: 2,
          letterSpacing: 0.3,
        }}
      >
        Email Queues
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          mb: 2,
          backgroundColor: "#fff",
          p: 1.5,
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <TextField
          size="small"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 160 }}
        />
        <Autocomplete
          size="small"
          options={countries}
          value={countryFilter}
          onChange={(e, value) => setCountryFilter(value || "All")}
          renderInput={(params) => <TextField {...params} label="Country" />}
          sx={{ minWidth: 140 }}
        />
        <Autocomplete
          size="small"
          options={designations}
          value={designationFilter}
          onChange={(e, value) => setDesignationFilter(value || "All")}
          renderInput={(params) => (
            <TextField {...params} label="Designation" />
          )}
          sx={{ minWidth: 140 }}
        />
        <Autocomplete
          size="small"
          options={companies}
          value={companyFilter}
          onChange={(e, value) => setCompanyFilter(value || "All")}
          renderInput={(params) => <TextField {...params} label="Company" />}
          sx={{ minWidth: 140 }}
        />
        <Autocomplete
          size="small"
          options={businesses}
          value={businessFilter}
          onChange={(e, value) => setBusinessFilter(value || "All")}
          renderInput={(params) => <TextField {...params} label="Business" />}
          sx={{ minWidth: 140 }}
        />
      </Box>

      <Paper sx={{ borderRadius: 2, boxShadow: 2 }}>
        <TableContainer sx={{ maxHeight: 480 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    backgroundColor: "#1976d2",
                    color: "white",
                    fontSize: 10.5,
                    fontWeight: 600,
                    padding: "4px 6px",
                    whiteSpace: "nowrap",
                  },
                }}
              >
                <TableCell>ID</TableCell>
                <TableCell>Lead Campaign ID</TableCell>
                <TableCell>First</TableCell>
                <TableCell>Last</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Business</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Template</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Updated</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={14}
                    align="center"
                    sx={{ py: 2, fontSize: 11 }}
                  >
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item, index) => (
                  <TableRow
                    key={item.id}
                    hover
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                      "&:hover": { backgroundColor: "#f2f8ff" },
                    }}
                  >
                    <TableCell sx={{ fontSize: 10, py:1, px: 0.8 }}>
                      {item.id}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py:0.9}}>
                      {item.lead_campaign_id}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py:0.9}}>
                      {item.first_name}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py:0.9}}>
                      {item.last_name}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py:0.9}}>
                      {item.email}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py:0.9}}>
                      {item.designation}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py:0.9}}>
                      {item.company}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py:0.9}}>
                      {item.business}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py:0.9}}>
                      {item.country}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py:0.9}}>
                      {item.phone}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: 10,
                        py:1,
                        fontWeight: 600,
                        color: item.status === "Active" ? "green" : "red",
                      }}
                    >
                      {item.status}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py:0.9}}>
                      {item.email_template_group}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py:0.9}}>
                      {new Date(item.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py:0.9}}>
                      {new Date(item.updated_at).toLocaleDateString()}
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
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                fontSize: 11,
              },
          }}
        />
      </Paper>
    </Box>
  );
}
