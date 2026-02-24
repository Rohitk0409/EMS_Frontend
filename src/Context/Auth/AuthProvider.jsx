import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth
      ? JSON.parse(storedAuth)
      : { user: null, accessToken: null };
  });

  // Save auth to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const login = useCallback((email, password) => {
    setAuth({
      user: {
        id: "1",
        name: "Rohit",
        email,
        role: "admin",
        tenantId: "tenant_001",
      },
      accessToken: "mock_access_token_123",
    });
  }, []);

  const logout = useCallback(() => {
    setAuth({ user: null, accessToken: null });
    localStorage.removeItem("auth");
  }, []);

  const contextValue = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth, login, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
