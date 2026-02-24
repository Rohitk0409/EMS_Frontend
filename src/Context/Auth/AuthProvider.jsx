import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../../Hooks/api";
import { AuthContext } from "./AuthContext";
function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  // Save auth to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const signUp = useCallback(async (name, email, password, mobile) => {
    try {
      const res = await api.post("/v1/register", {
        email,
        password,
        name,
        mobile,
      });
      setAuth(res?.data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }, []);

  // login
  const login = useCallback(async (email, password) => {
    try {
      const res = await api.post("/v1/login", { email, password });
      setAuth(res?.data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }, []);

  const logout = useCallback(() => {
    setAuth({ user: null, accessToken: null });
    localStorage.removeItem("auth");
  }, []);

  const contextValue = useMemo(
    () => ({
      auth,
      signUp,
      login,
      logout,
    }),
    [auth, login, logout, signUp],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
