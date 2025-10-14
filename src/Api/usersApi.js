"use client";
import Cookies from "js-cookie";

export const fetchCurrentUser = async () => {
  const token = Cookies.get("token");
  if (!token) throw new Error("No token found");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me/`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch user");

  const data = await res.json();
  return data.data ? [data.data] : [];
};
