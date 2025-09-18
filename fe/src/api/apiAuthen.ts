import axios from "axios";
import { BASE_API } from "./constant";
const API_AUTHEN = `${BASE_API}/auth`;

export const callApiRegister = async (valRegister: any) => await axios.post(`${API_AUTHEN}/regiates`, valRegister);
export const callApiLogin = async (valLogin: any) => await axios.post(`${API_AUTHEN}/login`, valLogin, {withCredentials: true});
export const callApiToken = async () =>  await axios.get(`${API_AUTHEN}/me`, {withCredentials: true});
export const callApiLogout = async () => await axios.post(`${API_AUTHEN}/logout`, {}, {withCredentials: true});
