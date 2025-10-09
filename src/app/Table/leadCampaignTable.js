"use client";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
} from "@mui/material";
import Image from "next/image";

export default function LeadCampaignTable({
  campaigns,
  getStatusColor,
  setStatusPopup,
  setEditData,
  setModalOpen,
  handleDelete,
}) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                backgroundColor: "primary.main",
                color: "white",
                fontSize: 10,
                fontWeight: "bold",
                padding: "2px 12px",
              },
            }}
          >
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total Queued</TableCell>
            <TableCell>Total Active</TableCell>
            <TableCell>Total Sent</TableCell>
            <TableCell>Total Failed</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {campaigns.length === 0 ? (
            <TableRow></TableRow>
          ) : (
            campaigns.map((c) => (
              <TableRow key={c.id} hover>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.title}</TableCell>
                <TableCell>{c.description}</TableCell>
                <TableCell
                  style={{
                    color: "white",
                    backgroundColor: getStatusColor(c.status),
                    borderRadius: "500px",
                    padding: "2px 8px",
                    cursor: c.status !== "active" ? "pointer" : "default",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    if (c.status !== "active") {
                      setStatusPopup(c);
                    }
                  }}
                >
                  {c.status}
                </TableCell>
                <TableCell>{c.total_queued ?? 0}</TableCell>
                <TableCell>{c.total_active ?? 0}</TableCell>
                <TableCell>{c.total_sent ?? 0}</TableCell>
                <TableCell>{c.total_failed ?? 0}</TableCell>
                <TableCell>{c.filters?.company || c.company || "-"}</TableCell>
                <TableCell>{c.filters?.country || c.country || "-"}</TableCell>
                <TableCell>
                  {c.created_at ? new Date(c.created_at).toLocaleString() : "-"}
                </TableCell>
                <TableCell>
                  {c.updated_at ? new Date(c.updated_at).toLocaleString() : "-"}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setEditData(c);
                      setModalOpen(true);
                    }}
                  >
                    <Image src="/edit.svg" alt="Edit" width={15} height={15} />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(c.id)}>
                    <Image
                      src="/delete.svg"
                      alt="Delete"
                      width={15}
                      height={15}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
