import axiosInstance from "../axiosInstance";

export async function fetchClasses() {
  const res = await axiosInstance.get("/admin/classes");
  return res.data.data;
}

export async function createClass(payload: { name: string }) {
  const res = await axiosInstance.post("/admin/classes", payload);
  return res.data.data;
}

export async function deleteClass(id: string) {
  const res = await axiosInstance.delete(`/admin/classes/${id}`);
  return res.data;
}
