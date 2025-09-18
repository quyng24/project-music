import axios from "axios";
import { BASE_API } from "./constant";

const API_URL = `${BASE_API}/users`;

export const getUsers = async () => await axios.get(API_URL);
export const getUserById = async (id) => await axios.get(`${API_URL}/${id}`);
export const deleteUser = async (id) => await axios.delete(`${API_URL}/${id}`);