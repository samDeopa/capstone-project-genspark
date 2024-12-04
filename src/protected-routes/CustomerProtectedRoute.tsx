import { enqueueSnackbar } from "notistack";
import React, { useContext } from "react";
import { Navigate } from "react-router";
import { customerContext } from "../contextAPI/customer/customerContextProvider";

interface CustomerProtectedRouteProps {
  children: JSX.Element;
}

const CustomerProtectedRoute: React.FC<CustomerProtectedRouteProps> = ({
  children,
}) => {
  const user = useContext(customerContext);
  console.log(user);
  if (!user.isLoggedIn || !("Customer" === user.role)) {
    enqueueSnackbar("Please Login First!", { variant: "error" });

    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};

export default CustomerProtectedRoute;
