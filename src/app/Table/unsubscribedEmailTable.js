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
  Button,
  IconButton,
} from "@mui/material";
import Image from "next/image";


export default function UnsubscribedEmailsTable({
  data,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  filteredCount,
  onDelete,
}) {
  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
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
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{ py: 2, fontSize: 12 }}
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
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete(item.email)}
                      sx={{ textTransform: "none", fontSize: 11 }}
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
