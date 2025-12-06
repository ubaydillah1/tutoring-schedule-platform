import axiosInstance from "../axiosInstance";

export async function fetchTutors() {
  const res = await axiosInstance.get("/admin/tutors");
  return res.data.data;
}

export async function createTutor(payload: {
  name: string;
  phoneNumber?: string;
}) {
  const res = await axiosInstance.post("/admin/tutors", payload);
  return res.data.data;
}

export async function deleteTutor(id: string) {
  const res = await axiosInstance.delete(`/admin/tutors/${id}`);
  return res.data;
}
