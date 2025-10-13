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
  Menu,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function LeadCampaignTable({
  campaigns,
  getStatusColor,
  setEditData,
  setModalOpen,
  handleDelete,
  updateStatus,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const handleMenuOpen = (event, campaign) => {
    setAnchorEl(event.currentTarget);
    setSelectedCampaign(campaign);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedCampaign(null);
  };

  const handleAction = (newStatus) => {
    if (selectedCampaign && updateStatus) {
      updateStatus(selectedCampaign.id, newStatus);
    }
    handleClose();
  };

  

  return (
    <Paper sx={{ borderRadius: 2, boxShadow: 2, overflow: "auto" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  backgroundColor: "primary.main",
                  color: "white",
                  fontSize: 11,
                  fontWeight: 600,
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
              <TableRow>
                <TableCell colSpan={13} align="center" sx={{ py: 2 }}>
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              campaigns.map((c, index) => (
                <TableRow
                  key={c.id}
                  hover
                  sx={{ backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff" }}
                >
                  <TableCell sx={{ fontSize: 11 }}>{c.id}</TableCell>
                  <TableCell sx={{ fontSize: 11 }}>{c.title}</TableCell>
                  <TableCell sx={{ fontSize: 11 }}>{c.description}</TableCell>
                  <TableCell
                    onClick={(e) => handleMenuOpen(e, c)}
                    sx={{
                      fontSize: 11,
                      fontWeight: 600,
                      textAlign: "center",
                      cursor: "pointer",
                      color: "#fff",
                      backgroundColor: getStatusColor(c.status),
                      borderRadius: "12px",
                      px: 1,
                      py: 0.5,
                      textTransform: "capitalize",
                    }}
                  >
                    {c.status}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11 }}>
                    {c.total_queued ?? 0}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11 }}>
                    {c.total_active ?? 0}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11 }}>
                    {c.total_sent ?? 0}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11 }}>
                    {c.total_failed ?? 0}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11 }}>
                    {c.filters?.company || c.company || "-"}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11 }}>
                    {c.filters?.country || c.country || "-"}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11 }}>
                    {c.created_at
                      ? new Date(c.created_at).toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell sx={{ fontSize: 11 }}>
                    {c.updated_at
                      ? new Date(c.updated_at).toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setEditData(c);
                        setModalOpen(true);
                      }}
                    >
                      <Image
                        src="/edit.svg"
                        alt="Edit"
                        width={15}
                        height={15}
                      />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(c.id)}
                    >
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


      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {selectedCampaign?.status === "pending" && [
          <MenuItem key="queued" onClick={() => handleAction("queued")}>
            Move to Queued
          </MenuItem>,
          <MenuItem
            key="cancelled"
            onClick={() => handleAction("cancelled")}
            sx={{ color: "error.main" }}
          >
            Cancel
          </MenuItem>,
        ]}

        {selectedCampaign?.status === "queued" && [
          <MenuItem key="active" onClick={() => handleAction("active")}>
            Move to Active
          </MenuItem>,
          <MenuItem key="pending" onClick={() => handleAction("pending")}>
            Back to Pending
          </MenuItem>,
          <MenuItem
            key="cancelled"
            onClick={() => handleAction("cancelled")}
            sx={{ color: "error.main" }}
          >
            Cancel
          </MenuItem>,
        ]}

        {(selectedCampaign?.status === "active" ||
          selectedCampaign?.status === "stopped") && [
          selectedCampaign.status === "active" ? (
            <MenuItem key="stop" onClick={() => handleAction("stopped")}>
              Stop Campaign
            </MenuItem>
          ) : (
            <MenuItem key="resume" onClick={() => handleAction("active")}>
              Resume Campaign
            </MenuItem>
          ),
          <MenuItem
            key="cancelled"
            onClick={() => handleAction("cancelled")}
            sx={{ color: "error.main" }}
          >
            Cancel
          </MenuItem>,
        ]}
      </Menu>
    </Paper>
  );
}
