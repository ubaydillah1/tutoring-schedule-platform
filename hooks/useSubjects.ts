import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSubjects,
  createSubject,
  deleteSubject,
} from "@/lib/api/subjects";

export function useSubjects() {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });
}

export function useCreateSubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
}

export function useDeleteSubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
}
