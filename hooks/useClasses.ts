import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchClasses, createClass, deleteClass } from "@/lib/api/classes";

export function useClasses() {
  return useQuery({
    queryKey: ["classes"],
    queryFn: fetchClasses,
  });
}

export function useCreateClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
}

export function useDeleteClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
}
