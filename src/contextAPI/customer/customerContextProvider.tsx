import React, { createContext, useState } from "react";

interface ContextType {
  isLoggedIn: boolean;
  userId: string;
  cartId?: string;
  role: string;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setCartId: React.Dispatch<React.SetStateAction<string | undefined>>;
  logout: () => void;
}
export const customerContext = createContext<ContextType>({
  isLoggedIn: false,
  userId: "",
  cartId: "",
  role: "",
  setIsLoggedIn: () => {},
  setUserId: () => {},
  setCartId: () => {},
  logout: () => {},
});

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [cartId, setCartId] = useState<string | undefined>(undefined);
  const [role, setRole] = useState("");

  const logout = (): void => {
    setIsLoggedIn(false);
    setUserId("");
    setCartId(undefined);
  };

  return (
    <customerContext.Provider
      value={{
        isLoggedIn,
        userId,
        cartId,
        role,
        setIsLoggedIn,
        setUserId,
        setCartId,
        logout,
      }}
    >
      {children}
    </customerContext.Provider>
  );
};
