export const fetchSettingsApi = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/settings/`
  );
  if (!res.ok) throw new Error("Failed to fetch settings");
  return res.json();
};

export const switchSettingApi = async (emailEnabled) => {
  const endpoint = emailEnabled
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/settings/stop_email`
    : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/settings/start_email`;

  const res = await fetch(endpoint, { method: "GET" });
  if (!res.ok) throw new Error("Failed to switch email");
  return res.json();
};
