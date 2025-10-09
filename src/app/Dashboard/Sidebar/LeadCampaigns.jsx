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
    }[status] || "black");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setCampaigns(await fetchCampaigns());
    setMeta(await fetchMeta());
  };

  const handleSave = async () => {
    await saveCampaign(editData);
    setModalOpen(false);
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteCampaign(id);
    loadData();
  };

  const updateStatus = async (id, newStatus) => {
    await updateCampaignStatus(id, newStatus);
    setStatusPopup(null);
    loadData();
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

      <LeadCampaignTable
        campaigns={campaigns}
        getStatusColor={getStatusColor}
        setStatusPopup={setStatusPopup}
        setEditData={setEditData}
        setModalOpen={setModalOpen}
        handleDelete={handleDelete}
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
          <Typography>Filter</Typography>

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
