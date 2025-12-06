/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

export function useSessions(date: string, opts?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["sessions", date],
    queryFn: async () => {
      const res = await axiosInstance.get(`/admin/sessions?date=${date}`);
      return res.data.data;
    },
    enabled: opts?.enabled ?? true,
  });
}

export function useUpdateSession() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      slotId: string;
      instanceId: string | null;
      date: string;
      tutorIds: string[];
      subjectIds: string[];
    }) => {
      console.log(payload);
      const res = await axiosInstance.put(`/admin/sessions/${payload.slotId}`, {
        id: payload.instanceId ?? null,
        date: payload.date,
        tutorIds: payload.tutorIds,
        subjectIds: payload.subjectIds,
      });

      return res.data;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["sessions", vars.date] });
    },
  });
}
