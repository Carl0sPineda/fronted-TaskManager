import { Task, FormData } from "../interfaces/task.interface";
import axios from "axios";

const baseUrl = "http://localhost:5122/api/tasks";

export const getAllTaskCompleted = async (): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(`${baseUrl}/completed`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTasInProgress = async (): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(`${baseUrl}/progress`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTaskPosponed = async (): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(`${baseUrl}/postponed`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postTask = async (formData: FormData): Promise<Task[]> => {
  try {
    const response = await axios.post(baseUrl, formData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create todo");
  }
};

export const deleteTask = async (taskId: number): Promise<void> => {
  try {
    await axios.delete(`${baseUrl}/${taskId}`);
  } catch (error) {
    throw error;
  }
};
