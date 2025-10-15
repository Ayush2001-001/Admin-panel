"use client";

import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";

export default function EmailQueuesTable({
  data,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  filteredCount,
}) {
  const [selectedItem, setSelectedItem] = useState(null);

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleView = (item) => setSelectedItem(item);
  const handleClose = () => setSelectedItem(null);

  return (
    <>
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
                <TableCell>Status</TableCell>
                <TableCell>Template</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={12}
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
                    <TableCell sx={{ fontSize: 10, py: 1, px: 0.8 }}>
                      {item.id}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py: 0.9 }}>
                      {item.lead_campaign_id}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py: 0.9 }}>
                      {item.first_name}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py: 0.9 }}>
                      {item.last_name}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py: 0.9 }}>
                      {item.email}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py: 0.9 }}>
                      {item.designation}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py: 0.9 }}>
                      {item.company}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py: 0.9 }}>
                      {item.business}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py: 0.9 }}>
                      {item.country}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: 10,
                        py: 1,
                        fontWeight: 600,
                        color: item.status === "Active" ? "green" : "red",
                      }}
                    >
                      {item.status}
                    </TableCell>
                    <TableCell sx={{ fontSize: 10, py: 0.9 }}>
                      {item.email_template_group}
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, py: 0.9 }}>
                      <IconButton onClick={() => handleView(item)}>
                        <Image
                          src="/view.svg"
                          alt="View"
                          width={18}
                          height={18}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredCount}
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

      <Dialog
        open={!!selectedItem}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Details</DialogTitle>
        <DialogContent dividers>
          {selectedItem &&
            [
              "id",
              "lead_campaign_id",
              "first_name",
              "last_name",
              "email",
              "designation",
              "company",
              "business",
              "country",
              "phone",
              "status",
              "email_template_group",
              "created_at",
              "updated_at",
            ].map((key, index) => (
              <Grid
                container
                key={key}
                sx={{
                  py: 1.2,
                  px: 2,
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 1,
                  mb: 0.5,
                }}
              >
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ fontWeight: 500, minWidth: 160 }}
                  >
                    {key.replace("_", " ").toUpperCase()}
                  </Typography>
                </Grid>
                <Grid item>
                  {key === "status" ? (
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        px: 1.5,
                        py: 0.4,
                        borderRadius: 1,
                        color: "#fff",
                        backgroundColor:
                          selectedItem.status === "Active" ? "green" : "red",
                      }}
                    >
                      {selectedItem.status}
                    </Typography>
                  ) : key === "email_template_group" ? (
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        px: 1.5,
                        py: 0.4,
                        borderRadius: 1,
                        backgroundColor: "#e0f2ff",
                        color: "#1976d2",
                      }}
                    >
                      {selectedItem.email_template_group}
                    </Typography>
                  ) : ["created_at", "updated_at"].includes(key) &&
                    selectedItem[key] ? (
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {new Date(selectedItem[key]).toLocaleString()}
                    </Typography>
                  ) : (
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedItem[key]}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
