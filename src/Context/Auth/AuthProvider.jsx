import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
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

  const authData = async () => {
    try {
      const res = await api.get("/v1/me");

      setAuth((prev) => ({
        ...prev,
        user: res?.data?.user,
      }));
    } catch (e) {
      console.error("Auth fetch failed:", e);
    }
  };
  const signUp = useCallback(async (name, email, password, mobile) => {
    try {
      const res = await api.post("/v1/register", {
        email,
        password,
        name,
        mobile,
      });
      setAuth(res?.data);
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try again.";

      toast.error(backendMessage);
    } finally {
    }
  }, []);

  // login
  const login = useCallback(async (email, password) => {
    try {
      const res = await api.post("/v1/login", { email, password });
      setAuth(res?.data);
      await authData();
    } catch (e) {
      toast.error("Email or Password is incorrect!");
      console.log(e);
    } finally {
    }
  }, []);

  const logout = useCallback(() => {
    setAuth(null);
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
