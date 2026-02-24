import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "../Context/Auth/useAuth";
import api from "./api";

export const fetchTenantUsers = async () => {
  const { data } = await api.get("/v1/user/all");
  return data?.users;
};

export const fetchTenantLogs = async () => {
  const { data } = await api.get("/v1/log");
  return data;
};

const usePrefetchData = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const companyId = auth?.companyId;

  useEffect(() => {
    if (!companyId) return;

    queryClient.prefetchQuery({
      queryKey: ["users", companyId],
      queryFn: fetchTenantUsers,
      staleTime: 10 * 60 * 1000,
    });
    queryClient.prefetchQuery({
      queryKey: ["logs", companyId],
      queryFn: fetchTenantLogs,
      staleTime: 10 * 60 * 1000,
    });
  }, [auth, companyId, queryClient]); // 🔥 IMPORTANT
};

export default usePrefetchData;
