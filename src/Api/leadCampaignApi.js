"use client";
import Cookies from "js-cookie";

export const fetchCampaigns = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_campaigns/`,
    {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    }
  );
  const json = await res.json();
  return json.data || [];
};

export const fetchMeta = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/metaOptions`
  );
  const json = await res.json();
  return json.data || {};
};

export const saveCampaign = async (editData) => {
  const method = editData.id ? "PUT" : "POST";
  const url = editData.id
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_campaigns/${editData.id}`
    : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_campaigns/`;
  await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    body: JSON.stringify(editData),
  });
};

export const deleteCampaign = async (id) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_campaigns/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        accept: "application/json",
      },
    }
  );
};

export const updateCampaignStatus = async (id, newStatus) => {
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
};
