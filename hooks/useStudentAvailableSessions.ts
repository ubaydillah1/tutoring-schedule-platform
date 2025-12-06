/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

export function useStudentAvailableSessions(date: string | undefined) {
  return useQuery({
    queryKey: ["student-available-sessions", date],
    enabled: !!date,
    queryFn: async () => {
      if (!date) return [];

      const res = await axiosInstance.get(`/sessions`, {
        params: { date },
      });

      const data = res.data.data;

      return data.map((s: any) => ({
        id: s.sessionId,
        waktu: s.time,
        siswa: s.current,
        maksimal: s.max,
        subjek: s.subjects,
        tutor: s.tutors,
      }));
    },
  });
}
