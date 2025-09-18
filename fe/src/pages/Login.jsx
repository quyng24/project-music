import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authProvider } from "../context/auth";
import { Button } from "antd";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    authProvider.signin(email, password, (user, error) => {
      if (user) {
        if (user.role === "admin") navigate("/admin");
        else navigate("/user");
      } else {
        setError(error || "Sai tài khoản hoặc mật khẩu");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Đăng nhập</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />
        <input
          placeholder="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && (<p className="text-red-500 mb-4 text-sm text-center">{error}</p>)}
        <br />
        <Button type="primary" htmlType="submit" className="w-full font-medium" onClick={handleLogin} >Login</Button>
      </form>
    </div>
  );
}
