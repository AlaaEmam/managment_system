import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  loginData: any; // يمكن تحديد النوع بناءً على محتوى loginData
  children: ReactNode;
}

const ProtectedRoute = ({ loginData, children }: ProtectedRouteProps) => {
  // التحقق إذا كان هناك token في localStorage أو loginData موجود
  if (localStorage.getItem('token') || loginData) {
    return <>{children}</>;  // عرض الـ children إذا كان المستخدم مسجل دخوله
  } else {
    return <Navigate to="/login" />;  // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن مسجل الدخول
  }
};

export default ProtectedRoute;
