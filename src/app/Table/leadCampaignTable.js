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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
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
  const [viewCampaign, setViewCampaign] = useState(null);
  const handleMenuOpen = (event, campaign) => {
    setAnchorEl(event.currentTarget);
    setSelectedCampaign(campaign);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedCampaign(null);
  };

  const handleAction = (newStatus) => {
    if (selectedCampaign && updateStatus) {
      updateStatus(selectedCampaign.id, newStatus);
    }
    handleCloseMenu();
  };

  const handleView = (campaign) => setViewCampaign(campaign);
  const handleCloseView = () => setViewCampaign(null);

  return (
    <>
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
                    padding: "6px 8px",
                    whiteSpace: "nowrap",
                    textAlign: "center",
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
                campaigns.map((c, index) => (
                  <TableRow
                    key={c.id}
                    hover
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                    }}
                  >
                    <TableCell sx={{ fontSize: 11, py: 0.9 }}>{c.id}</TableCell>
                    <TableCell sx={{ fontSize: 11, py: 0.9 }}>
                      {c.title}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, py: 0.9 }}>
                      {c.description}
                    </TableCell>
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
                        py: 0.3,
                        textTransform: "capitalize",
                      }}
                    >
                      {c.status}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, py: 0.9 }}>
                      {c.total_queued ?? 0}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, py: 0.9 }}>
                      {c.total_active ?? 0}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, py: 0.9 }}>
                      {c.total_sent ?? 0}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, py: 0.9 }}>
                      {c.total_failed ?? 0}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, py: 0.9 }}>
                      {c.filters?.company || "-"}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, py: 0.9 }}>
                      {c.filters?.country || "-"}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, py: 0.9 }}>
                      {c.created_at
                        ? new Date(c.created_at).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, py: 0.9 }}>
                      {c.updated_at
                        ? new Date(c.updated_at).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, py: 0.9 }}>
                      <IconButton onClick={() => handleView(c)}>
                        <Image
                          src="/view.svg"
                          alt="View"
                          width={15}
                          height={15}
                        />
                      </IconButton>
                      {c.status === "pending" && (
                        <>
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
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          {selectedCampaign?.status === "pending" && [
            <MenuItem key="queued" onClick={() => handleAction("queued")}>
              Move to Queued
            </MenuItem>,
            <MenuItem
              key="cancelled"
              onClick={() => handleAction("cancelled")}
              sx={{ color: "error.main" }}
            >
              Close
            </MenuItem>,
          ]}
          {selectedCampaign?.status === "queued" && [
            <MenuItem key="active" onClick={() => handleAction("active")}>
              Move to Active
            </MenuItem>,
            <MenuItem
              key="cancelled"
              onClick={() => handleAction("cancelled")}
              sx={{ color: "error.main" }}
            >
              Close
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
              Close
            </MenuItem>,
          ]}
        </Menu>
      </Paper>

      <Dialog
        open={!!viewCampaign}
        onClose={handleCloseView}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Lead Campaign Details</DialogTitle>
        <DialogContent dividers sx={{ maxHeight: "400px", overflowY: "auto" }}>
          {viewCampaign &&
            [
              "id",
              "title",
              "description",
              "email_template_group",
              "status",
              "total_queued",
              "total_active",
              "total_sent",
              "total_failed",
              "filters",
              "created_at",
              "updated_at",
            ].map((key, index) => (
              <Grid
                container
                key={key}
                sx={{
                  py: 1.2,
                  px: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 1,
                  mb: 0.5,
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
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
                          viewCampaign.status === "pending"
                            ? "orange"
                            : "green",
                      }}
                    >
                      {viewCampaign.status}
                    </Typography>
                  ) : key === "filters" ? (
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      Company:{" "}
                      {viewCampaign.filters?.additionalProp1?.company || "-"},
                      Country:{" "}
                      {viewCampaign.filters?.additionalProp1?.country || "-"}
                    </Typography>
                  ) : ["created_at", "updated_at"].includes(key) ? (
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {viewCampaign[key]
                        ? new Date(viewCampaign[key]).toLocaleString()
                        : "-"}
                    </Typography>
                  ) : (
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {viewCampaign[key]}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
