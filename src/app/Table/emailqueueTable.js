"use client";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
} from "@mui/material";

export default function EmailQueuesTable({
  data,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  filteredCount,
}) {
  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
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
            { fontSize: 11 },
        }}
      />
    </Paper>
  );
}
