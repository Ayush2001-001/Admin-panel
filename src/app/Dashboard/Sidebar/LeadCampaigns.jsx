"use client";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Autocomplete,
  Typography,
  IconButton
} from "@mui/material";
import Cookies from "js-cookie";
import Image from "next/image";

export default function LeadCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [meta, setMeta] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [statusPopup, setStatusPopup] = useState(null);

  const emptyCampaign = {
    title: "",
    description: "",
    email_template_group: "",
    company: "",
    country: "",
    designation: "",
    business: "",
  };

  useEffect(() => {
    fetchCampaigns();
    fetchMeta();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_campaigns/`,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      const json = await res.json();
      setCampaigns(json.data || []);
    } catch {
      setCampaigns([]);
    }
  };

  const fetchMeta = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/metaOptions`
      );
      const json = await res.json();
      setMeta(json.data || {});
    } catch {
      setMeta({});
    }
  };

  const getStatusColor = (status) =>
    ({
      pending: "#FFA500",
      queued: "#1E90FF",
      active: "#32CD32",
      completed: "#808080",
      cancelled: "#FF0000",
    }[status] || "black");

  const handleSave = async () => {
    const method = editData.id ? "PUT" : "POST";
    const url = editData.id
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_campaigns/${editData.id}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_campaigns/`;
    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(editData),
      });
      setModalOpen(false);
      fetchCampaigns();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_campaigns/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete campaign: ${response.status} ${errorText}`
        );
      }

      console.log("Campaign deleted successfully");
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_campaigns/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      setStatusPopup(null);
      fetchCampaigns();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          Lead Campaigns
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditData(emptyCampaign);
            setModalOpen(true);
          }}
        >
          Add Campaign
        </Button>
      </Box>

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
              <TableRow>
                {/* <TableCell colSpan={5} align="center">
                  No campaigns found
                </TableCell> */}
              </TableRow>
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
                  <TableCell>
                    {c.filters?.company || c.company || "-"}
                  </TableCell>
                  <TableCell>
                    {c.filters?.country || c.country || "-"}
                  </TableCell>
                  <TableCell>
                    {c.created_at
                      ? new Date(c.created_at).toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell>
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
                    <Image src="/edit.svg" alt="Edit" width={15} height={15} />
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

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editData?.id ? "Edit Campaign" : "Add Campaign"}
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Title"
            value={editData?.title || ""}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
          />
          <TextField
            label="Description"
            value={editData?.description || ""}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
          />

          <Autocomplete
            options={meta.email_template_groups || []}
            getOptionLabel={(o) => o.value || ""}
            value={
              meta.email_template_groups?.find(
                (o) => o.key === editData?.email_template_group
              ) || null
            }
            onChange={(_, v) =>
              setEditData({ ...editData, email_template_group: v?.key || "" })
            }
            renderInput={(params) => (
              <TextField {...params} label="Email Template Group" />
            )}
          />
          <Typography>Filters</Typography>
          {["company", "country"].map((field) => (
            <Autocomplete
              key={field}
              freeSolo
              options={meta[`${field}s`] || []}
              value={editData?.[field] || ""}
              onChange={(_, v) =>
                setEditData({ ...editData, [field]: v || "" })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                />
              )}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!statusPopup} onClose={() => setStatusPopup(null)}>
        <DialogTitle>Change Status</DialogTitle>
        <DialogActions>
          {statusPopup?.status === "pending" && (
            <Button onClick={() => updateStatus(statusPopup.id, "queued")}>
              Move to Queued
            </Button>
          )}
          {statusPopup?.status === "queued" && (
            <Button onClick={() => updateStatus(statusPopup.id, "active")}>
              Move to Active
            </Button>
          )}
          <Button onClick={() => setStatusPopup(null)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
