import axios from "axios";
import type { User } from "../types/user";

const API_URL = import.meta.env.VITE_APP_BACKEND_URL;

export const getUsers = () => axios.get<User[]>(`${API_URL}/users`);
export const getUserById = (id: number) => axios.get<User>(`${API_URL}/users/${id}`);
export const createUser = (data: User) => axios.post(`${API_URL}/users`, data);
export const updateUser = (id: number, data: User) => axios.put(`${API_URL}/users/${id}`, data);

export const deleteUser = (id: number) => axios.delete(`${API_URL}/users/${id}`);