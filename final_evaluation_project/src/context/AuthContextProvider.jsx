import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [authDetails, setAuthDetails] = useState({
    isAuthenticated: false,
    token: null,
    email: null,
  });

  const login = (token, email) => {
    setAuthDetails({
      isAuthenticated: true,
      token,
      email: email,
    });
  };
  const logout = () => {
    setAuthDetails({
      isAuthenticated: false,
      token: null,
      email: null,
    });
  };
  return (
    <AuthContext.Provider value={{ authDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
