"use client";
import Cookies from "js-cookie";

export const fetchEmailQueues = async () => {
  const token = Cookies.get("token");
  if (!token) throw new Error("No token found");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lead_email_queues/`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch data");

  const data = await res.json();
  return data.data || [];
};
