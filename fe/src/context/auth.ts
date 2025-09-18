import { callApiLogin, callApiLogout, callApiToken } from "../api/apiAuthen";
import { User } from "../types/user";

interface LoginCallback {
  (userData: any | null, errorMessage?: string): void;
}

export const authProvider = {
  isAuthenticated: false,
  user: null as User | null,

  async init(): Promise<void> {
    try {
      const res = await callApiToken();
      this.user = res.data;
      this.isAuthenticated = true;
    } catch (err) {
      console.error("Không xác thực được user:", err instanceof Error ? err.message : String(err));
    }
  },

  async signin(email: string, password: string, callback: LoginCallback): Promise<void> {
    try {
      await callApiLogin({ email, password });
      setTimeout(async () => {
        const res = await callApiToken();
        console.log(res.data);
        this.isAuthenticated = true;
        this.user = res.data;
        callback(res.data);
      }, 300);
    } catch (error: any) {
      const errMessage = error.response?.data?.message || "Lỗi kết nối đến server";
      console.error("Đăng nhập lỗi:", errMessage);
      callback(null, errMessage);
    }
  },

  async signout(callback?: () => void): Promise<void> {
    try {
      await callApiLogout();
    } catch (err: any) {
      console.error("Lỗi khi đăng xuất:", err.message);
    }
    if (callback) setTimeout(callback, 200);
  },
};
