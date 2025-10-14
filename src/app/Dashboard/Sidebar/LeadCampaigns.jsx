"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import LeadCampaignTable from "../../Table/leadCampaignTable";
import {
  fetchCampaigns,
  fetchMeta,
  saveCampaign,
  deleteCampaign,
  updateCampaignStatus,
} from "../../../Api/leadCampaignApi";

export default function LeadCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [meta, setMeta] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [statusPopup, setStatusPopup] = useState(null);
  const [loading, setLoading] = useState(true);

  const emptyCampaign = {
    title: "",
    description: "",
    email_template_group: "",
    company: "",
    country: "",
    designation: "",
    business: "",
  };

  const getStatusColor = (status) =>
    ({
      pending: "#FFA500",
      queued: "#1E90FF",
      active: "#32CD32",
      completed: "#808080",
      cancelled: "#FF0000",
    }[status] || "grey");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const campaignData = await fetchCampaigns();
      const metaData = await fetchMeta();
      setCampaigns(campaignData);
      setMeta(metaData);
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await saveCampaign(editData);
      setModalOpen(false);
      await loadData();
    } catch (err) {
      console.error("Error saving:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteCampaign(id);
      await loadData();
    } catch (err) {
      console.error("Error deleting:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      setLoading(true);
      await updateCampaignStatus(id, newStatus);
      setStatusPopup(null);
      await loadData();
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "75vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

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
          Add Lead Campaign
        </Button>
      </Box>

      <LeadCampaignTable
        campaigns={campaigns}
        getStatusColor={getStatusColor}
        setEditData={setEditData}
        setModalOpen={setModalOpen}
        handleDelete={handleDelete}
        updateStatus={handleStatusUpdate}
      />

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
          <Button onClick={() => setModalOpen(false)}>Close</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!statusPopup} onClose={() => setStatusPopup(null)}>
        <DialogTitle>Change Status</DialogTitle>
        <DialogActions sx={{ flexDirection: "column", gap: 1, p: 2 }}>
          {statusPopup?.status === "pending" && (
            <>
              <Button
                fullWidth
                onClick={() => handleStatusUpdate(statusPopup.id, "queued")}
              >
                Move to Queued
              </Button>
              <Button
                fullWidth
                color="error"
                onClick={() => handleStatusUpdate(statusPopup.id, "cancelled")}
              >
                Close
              </Button>
            </>
          )}

          {statusPopup?.status === "queued" && (
            <>
              <Button
                fullWidth
                onClick={() => handleStatusUpdate(statusPopup.id, "active")}
              >
                Move to Active
              </Button>
              <Button
                fullWidth
                color="error"
                onClick={() => handleStatusUpdate(statusPopup.id, "cancelled")}
              >
                Close
              </Button>
            </>
          )}

          {statusPopup?.status === "active" && (
            <>
              <Button
                fullWidth
                onClick={() => handleStatusUpdate(statusPopup.id, "stopped")}
              >
                Stop Campaign
              </Button>
              <Button
                fullWidth
                onClick={() => handleStatusUpdate(statusPopup.id, "active")}
              >
                Resume Campaign
              </Button>
              <Button
                fullWidth
                color="error"
                onClick={() => setStatusPopup(null)}
              >
                Close
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
