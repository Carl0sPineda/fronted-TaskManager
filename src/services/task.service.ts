import { Task, FormData } from "../interfaces/task.interface";
import axios from "axios";

const baseUrl = "http://localhost:5122/api/tasks";

export const getAllTaskCompleted = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${baseUrl}/completed`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get task completed");
  }
};

export const getAllTasInProgress = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${baseUrl}/progress`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get task in progress");
  }
};

export const getAllTaskPosponed = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${baseUrl}/postponed`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get task postponed");
  }
};

export const postTask = async (formData: FormData): Promise<Task[]> => {
  try {
    const response = await axios.post(baseUrl, formData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add task");
  }
};

export const deleteTask = async (taskId: number): Promise<void> => {
  try {
    await axios.delete(`${baseUrl}/${taskId}`);
  } catch (error) {
    throw new Error("Failed to delete task");
  }
};

export const putTask = async (formData: Task): Promise<Task> => {
  try {
    const response = await axios.put(`${baseUrl}/${formData.id}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update task`);
  }
};
