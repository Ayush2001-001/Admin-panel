"use client";
export async function loginUser(email, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Invalid credentials");
  return data;
}

export async function forgotPassword(email) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Failed to send reset link");
  return data;
}

export async function resetPassword(token, newPassword) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, new_password: newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Failed to reset password");
  return data;
}
