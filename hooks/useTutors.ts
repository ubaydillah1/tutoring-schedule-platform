import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTutors, createTutor, deleteTutor } from "@/lib/api/tutors";

export function useTutors() {
  return useQuery({
    queryKey: ["tutors"],
    queryFn: fetchTutors,
  });
}

export function useCreateTutor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTutor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutors"] });
    },
  });
}

export function useDeleteTutor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTutor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutors"] });
    },
  });
}
