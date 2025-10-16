"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { fetchEmailQueues } from "../api/EmailQueueApi";
import EmailQueuesTable from "../table/EmailQueueTable";

export default function EmailQueues() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");
  const [designationFilter, setDesignationFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [businessFilter, setBusinessFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchEmailQueues();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
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

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#1976d2", mb: 2, letterSpacing: 0.3 }}
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
          onChange={(e, v) => setCountryFilter(v || "All")}
          renderInput={(params) => <TextField {...params} label="Country" />}
          sx={{ minWidth: 140 }}
        />
        <Autocomplete
          size="small"
          options={designations}
          value={designationFilter}
          onChange={(e, v) => setDesignationFilter(v || "All")}
          renderInput={(params) => (
            <TextField {...params} label="Designation" />
          )}
          sx={{ minWidth: 140 }}
        />
        <Autocomplete
          size="small"
          options={companies}
          value={companyFilter}
          onChange={(e, v) => setCompanyFilter(v || "All")}
          renderInput={(params) => <TextField {...params} label="Company" />}
          sx={{ minWidth: 140 }}
        />
        <Autocomplete
          size="small"
          options={businesses}
          value={businessFilter}
          onChange={(e, v) => setBusinessFilter(v || "All")}
          renderInput={(params) => <TextField {...params} label="Business" />}
          sx={{ minWidth: 140 }}
        />
      </Box>

      <EmailQueuesTable
        data={filteredData}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        filteredCount={filteredData.length}
      />
    </Box>
  );
}
