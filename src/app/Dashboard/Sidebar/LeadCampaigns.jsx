"use client";
import { useState } from "react";
import {
  Box,
  Button,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TextField,
  Typography,
  TableBody,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
} from "@mui/material";

export default function LeadCampaigns() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    emailGroup: "",
    country: "",
    company: "",
    business: "",
  });

  const emailGroups = ["Project", "Staff", "Remote Job"];
  const countries = [""];
  const companies = [""];
  const businesses = [""];

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ fontSize: 25, fontWeight: "bold" }}>
          Campaign
        </Typography>
        <Button
          variant="contained"
          sx={{ marginLeft: 100, width: 150, height: 35 }}
          onClick={() => setOpen(true)}
        >
          Add
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 400, mt: 5 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
              }}
            >
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Email template group</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Business</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>{form.title}</TableCell>
              <TableCell>{form.description}</TableCell>
              <TableCell>{form.emailGroup}</TableCell>
              <TableCell>{form.country}</TableCell>
              <TableCell>{form.company}</TableCell>
              <TableCell>{form.business}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Campaign</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <Autocomplete
            options={emailGroups}
            value={form.emailGroup}
            onChange={(e, v) => setForm({ ...form, emailGroup: v })}
            renderInput={(params) => (
              <TextField {...params} label="Email Template Group" />
            )}
          />
          <Autocomplete
            options={countries}
            value={form.country}
            onChange={(e, v) => setForm({ ...form, country: v })}
            renderInput={(params) => <TextField {...params} label="Country" />}
          />
          <Autocomplete
            options={companies}
            value={form.company}
            onChange={(e, v) => setForm({ ...form, company: v })}
            renderInput={(params) => <TextField {...params} label="Company" />}
          />
          <Autocomplete
            options={businesses}
            value={form.business}
            onChange={(e, v) => setForm({ ...form, business: v })}
            renderInput={(params) => <TextField {...params} label="Business" />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
