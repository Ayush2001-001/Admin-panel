"use client";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";

export default function SettingsTable({ settings }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: "65vh",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                backgroundColor: "#1976d2",
                color: "white",
                fontSize: 11,
                fontWeight: 600,
                padding: "6px 10px",
                whiteSpace: "nowrap",
              },
            }}
          >
            <TableCell>ID</TableCell>
            <TableCell>Setting Key</TableCell>
            <TableCell>Setting Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {settings.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                align="center"
                sx={{ fontSize: 12, py: 3 }}
              >
                No settings found
              </TableCell>
            </TableRow>
          ) : (
            settings.map((item, i) => (
              <TableRow
                key={item.id}
                hover
                sx={{
                  backgroundColor: i % 2 === 0 ? "#fafafa" : "white",
                  "&:hover": { backgroundColor: "#f4f8ff" },
                }}
              >
                <TableCell sx={{ fontSize: 11, padding: "5px 10px" }}>
                  {item.id}
                </TableCell>
                <TableCell sx={{ fontSize: 11, padding: "5px 10px" }}>
                  {item.setting_key}
                </TableCell>
                <TableCell sx={{ fontSize: 11, padding: "5px 10px" }}>
                  {item.setting_value}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
