const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api/employees";

async function request(path = "", options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const getEmployees = () => request();
export const createEmployee = (body) => request("", { method: "POST", body: JSON.stringify(body) });
export const updateEmployee = (id, body) => request(`/${id}`, { method: "PUT", body: JSON.stringify(body) });
export const deleteEmployee = (id) => request(`/${id}`, { method: "DELETE" });
