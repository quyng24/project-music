import type {ReactNode} from 'react';
import { Navigate } from "react-router-dom";
import { authProvider } from "../context/auth";
import { useEffect, useState } from "react";
import LayoutDefault from "../layouts/LayoutDefault";

interface ProtectedRouterProps {
  children: ReactNode,
  role: string
}

export default function ProtectedRoute({ children, role }: ProtectedRouterProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      await authProvider.init();
      const isAuth = authProvider.isAuthenticated;
      const hasRole = authProvider?.user?.role === role;

      if (isAuth && hasRole) {
        setIsAllowed(true);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center text-xl font-medium text-blue-500">
        Đang kiểm tra quyền truy cập...
      </div>
    );
  }

  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }
  return (
    <LayoutDefault>
      {children}
    </LayoutDefault>
  );
}