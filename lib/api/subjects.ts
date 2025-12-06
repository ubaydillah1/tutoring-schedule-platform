import axiosInstance from "../axiosInstance";

export async function fetchSubjects() {
  const res = await axiosInstance.get("/admin/subjects");
  return res.data.data;
}

export async function createSubject(payload: {
  name: string;
  description?: string;
}) {
  const res = await axiosInstance.post("/admin/subjects", payload);
  return res.data.data;
}

export async function deleteSubject(id: string) {
  const res = await axiosInstance.delete(`/admin/subjects/${id}`);
  return res.data;
}
