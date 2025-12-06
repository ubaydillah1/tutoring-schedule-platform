import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export function useStudentRegister() {
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      classId: string;
      sessionId: string;
      date: string;
      materi: string;
    }) => {
      const res = await axiosInstance.post("/form", payload);
      return res.data;
    },
  });
}
