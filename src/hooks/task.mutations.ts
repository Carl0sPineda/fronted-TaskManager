import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask, postTask, putTask } from "../services/task.service";

const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["completed"] });
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["postponed"] });
    },
  });
};

const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["completed"] });
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["postponed"] });
    },
  });
};

const usePutTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["completed"] });
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["postponed"] });
    },
  });
};

export { useDeleteTask, useAddTask, usePutTask };
