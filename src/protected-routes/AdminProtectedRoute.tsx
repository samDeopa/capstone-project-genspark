import { enqueueSnackbar } from "notistack";
import React from "react";
import { Navigate } from "react-router";
import { useAdminContext } from "../contextAPI/admin/adminContextProvider";

interface AdminProtectedRouteProps {
  children: JSX.Element;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
  children,
}) => {
  const user = useAdminContext();
  console.log(user);
  if (!user || !("Admin" === user.role)) {
    enqueueSnackbar("Unauthorized access!", { variant: "error" });

    return <Navigate to={"/admin/login"} />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
