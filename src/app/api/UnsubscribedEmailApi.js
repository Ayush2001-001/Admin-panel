"use client";
import Cookies from "js-cookie";

export const fetchUnsubscribedEmails = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/unsubscribed_emails/`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  const json = await res.json();
  return Array.isArray(json.data) ? json.data : json;
};

export const addUnsubscribedEmail = async (email) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/unsubscribed_emails/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({ email }),
    }
  );
  if (!res.ok) throw new Error("Failed to add email");
  return res.json();
};

export const deleteUnsubscribedEmail = async (email) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/unsubscribed_emails/${email}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to delete email");
  return res.json();
};

export const importUnsubscribedEmails = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/unsubscribed_emails/import`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: formData,
    }
  );
  if (!res.ok) throw new Error("Failed to import file");
  return res.json();
};
