"use client"
import Cookies from "js-cookie";


export const fetchLeadContacts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_contacts/?skip=0&limit=50`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const importLeadContacts = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_contacts/import`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const addLeadContact = async (contact) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_contacts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    body: JSON.stringify(contact),
  });

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const updateLeadContact = async (id, data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_contacts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const deleteLeadContact = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_contacts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      accept: "application/json",
    },
  });

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};
