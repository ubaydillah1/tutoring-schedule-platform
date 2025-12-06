/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export function useStudentSessions(date: string | undefined) {
  return useQuery({
    queryKey: ["student-sessions", date],
    queryFn: async () => {
      if (!date) return [];

      const res = await axiosInstance.get<{
        data: any[];
        message: string;
      }>(`/upcomming-sessions?dateFilter=${date}`);

      return res.data.data.map((s) => ({
        id: s.sessionId,
        waktu: s.time,
        siswa: s.total,
        maksimal: s.maxStudents,
        subjek: s.subjects,
        tutor: s.tutors,
      }));
    },
    enabled: !!date,
  });
}
