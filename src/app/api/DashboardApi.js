"use client";
export const fetchDashboardData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard`,
      {
        headers: { accept: "application/json" },
      }
    );
    const json = await res.json();
    if (json.success) {
      return { data: json.data, error: null };
    } else {
      return { data: null, error: "Failed to load dashboard data." };
    }
  } catch (err) {
    return { data: null, error: "Error fetching dashboard data." };
  }
};
