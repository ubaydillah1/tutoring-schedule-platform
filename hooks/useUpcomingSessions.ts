/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

export function useUpcomingSessions(filters: {
  dateFilter?: string;
  subjectFilter?: string;
  limit?: number;
}) {
  const { dateFilter, subjectFilter, limit = 10 } = filters;

  const normalize = (v?: string) => (v ? v : "ALL");

  const safeDate = dateFilter && dateFilter !== "" ? dateFilter : undefined;
  const safeSubject =
    subjectFilter && subjectFilter !== "" ? subjectFilter : undefined;

  return useInfiniteQuery({
    queryKey: [
      "upcoming-sessions",
      normalize(safeDate),
      normalize(safeSubject),
    ],

    initialPageParam: null,

    queryFn: async ({ pageParam }) => {
      const res = await axiosInstance.get("/upcomming-sessions", {
        params: {
          cursor: pageParam,
          limit,
          dateFilter: safeDate,
          subjectFilter: safeSubject,
        },
      });

      return {
        data: res.data.data,
        nextCursor: res.data.nextCursor ?? null,
      };
    },

    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
