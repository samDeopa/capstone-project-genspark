import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router";

interface AdminContextType {
  isLoggedIn: boolean;
  userId: string;
  role: string;
  accessLevel: number;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setAccessLevel: React.Dispatch<React.SetStateAction<number>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isLoggedIn: false,
  userId: "",
  role: "",
  accessLevel: 0,
  setIsLoggedIn: () => {},
  setUserId: () => {},
  setAccessLevel: () => {},
  setRole: () => {},
  logout: () => {},
});

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [accessLevel, setAccessLevel] = useState<number>(0);
  const [role, setRole] = useState("");

  const logout = (): void => {
    setIsLoggedIn(false);
    setUserId("");
    setAccessLevel(0);
    setRole("");
  };

  return (
    <AdminContext.Provider
      value={{
        isLoggedIn,
        userId,
        accessLevel,
        role,
        setIsLoggedIn,
        setUserId,
        setAccessLevel,
        setRole,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within an admin layout");
  }
  return context;
};
