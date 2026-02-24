import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns"; // npm install date-fns
import { RefreshCw, Search, User } from "lucide-react";
import { memo, useState } from "react";
import { useAuth } from "../Context/Auth/useAuth";
import api from "../Hooks/api";
import { fetchTenantLogs } from "../Hooks/usePrefetch";

function RecentActivity() {
  const { auth } = useAuth();
  const companyId = auth?.companyId;
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: logData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["logs", companyId],
    queryFn: () => fetchTenantLogs(api),
    enabled: !!companyId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await queryClient.invalidateQueries({ queryKey: ["logs"] });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Prepare filtered & formatted activities
  const activities = logData
    .map((log) => {
      const userName = log.userId?.name || "System";
      const action = log.action || "Unknown";
      const message = log.message || "";
      const timeRaw = log.createdAt || log.updatedAt;

      const timeAgo = timeRaw
        ? formatDistanceToNow(new Date(timeRaw), { addSuffix: true })
        : "just now";

      const displayText = `${action === "CREATE" ? "Added" : action.toLowerCase()}: ${message}`;
      const searchText = `${userName} ${action} ${message}`.toLowerCase();

      return {
        id: log._id,
        text: displayText,
        user: userName,
        action,
        message,
        time: timeAgo,
        searchText,
      };
    })
    .sort((a, b) => new Date(b.timeRaw || 0) - new Date(a.timeRaw || 0)); // newest first

  const filteredActivities = activities.filter((item) =>
    item.searchText.includes(search.toLowerCase().trim()),
  );

  if (isLoading) {
    return (
      <section className="mt-5 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="bg-indigo-700 text-white px-5 py-3">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>
        <div className="p-8 text-center text-gray-500">
          <div className="inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p>Loading recent activity...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mt-5 border border-red-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="bg-red-600 text-white px-5 py-3">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>
        <div className="p-8 text-center text-red-600">
          <p>Failed to load activity logs.</p>
          <button
            onClick={handleRefresh}
            className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Recent Activity"
      className="mt-5 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-indigo-700 text-white px-5 py-3">
        <h2 className="text-lg font-semibold">Recent Activity</h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-72">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-200"
            />
            <input
              type="text"
              placeholder="Search by name, action, message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-indigo-400 rounded-md text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm"
            />
          </div>

          {/* Refresh */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            aria-label="Refresh activity logs"
            className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition disabled:opacity-50"
          >
            <RefreshCw
              size={18}
              className={`${isRefreshing ? "animate-spin" : ""} text-white`}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      {filteredActivities.length === 0 ? (
        <div className="p-10 text-center text-gray-500">
          {search.trim() ? (
            <p>No matching activity found for "{search}"</p>
          ) : (
            <p>No recent activity yet.</p>
          )}
        </div>
      ) : (
        <ul className="divide-y divide-gray-100 max-h-[460px] overflow-y-auto">
          {filteredActivities.map((item) => (
            <li
              key={item.id}
              className="px-5 py-3.5 hover:bg-gray-50 transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1.5 bg-indigo-100 text-indigo-700 rounded-full">
                  <User size={14} />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">{item.text}</p>
                  <p className="text-gray-500 text-xs mt-0.5">by {item.user}</p>
                </div>
              </div>

              <span className="text-xs text-gray-400 whitespace-nowrap sm:text-right">
                {item.time}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default memo(RecentActivity);
