import {
  getAllTasInProgress,
  getAllTaskCompleted,
  getAllTaskPosponed,
} from "../services/task.service";
import { useQuery } from "@tanstack/react-query";
import { Task } from "../interfaces/task.interface";

const useTaskCompleted = () => {
  return useQuery<Task[]>({
    queryKey: ["completed"],
    queryFn: getAllTaskCompleted,
  });
};

const useTaskProgress = () => {
  return useQuery<Task[]>({
    queryKey: ["progress"],
    queryFn: getAllTasInProgress,
  });
};

const useTaskPostponed = () => {
  return useQuery<Task[]>({
    queryKey: ["postponed"],
    queryFn: getAllTaskPosponed,
  });
};

export { useTaskCompleted, useTaskPostponed, useTaskProgress };
