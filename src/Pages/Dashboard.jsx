import { useQuery } from "@tanstack/react-query";
import { Activity, UserCheck, Users } from "lucide-react";
import { memo, useMemo } from "react";
import { useAuth } from "../Context/Auth/useAuth";
import api from "../Hooks/api";
import { fetchTenantUsers } from "../Hooks/usePrefetch";
import RecentActivitity from "./RecentActivitity";

function Dashboard() {
  const { auth } = useAuth();
  const companyId = auth?.companyId;

  const { data: employeesData = [], isLoading } = useQuery({
    queryKey: ["users", companyId],
    queryFn: () => fetchTenantUsers(api),
    enabled: !!companyId,
  });

  const cardVal = useMemo(() => {
    if (!employeesData?.length) {
      return { total: 0, active: 0, inactive: 0 };
    }

    return employeesData.reduce(
      (acc, emp) => {
        acc.total += 1;

        if (emp?.status?.toLowerCase() === "active") acc.active += 1;
        if (emp?.status?.toLowerCase() === "inactive") acc.inactive += 1;

        return acc;
      },
      { total: 0, active: 0, inactive: 0 },
    );
  }, [employeesData]);

  const statsData = [
    {
      title: " Employees",
      value: cardVal?.total || 0,
      icon: Users,
      color: "bg-indigo-600",
    },
    {
      title: "Active ",
      value: cardVal?.active || 0,
      icon: UserCheck,
      color: "bg-green-600",
    },

    {
      title: "Inactive ",
      value: cardVal?.inactive || 0,
      icon: Activity,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      {/* ================= HEADER SECTION ================= */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back! Here’s what’s happening in your organization.
        </p>
      </header>

      {/* ================= CARD SECTION ================= */}
      <section
        aria-label="Dashboard Statistics"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
      >
        {statsData.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm px-4  py-3 flex items-center justify-between hover:shadow-md transition gap-2"
            >
              <div
                className={`${item.color} p-2 rounded-lg text-white`}
                aria-hidden="true"
              >
                <Icon size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <h2 className="text-2xl font-bold text-gray-800 mt-1">
                  {item.value}
                </h2>
              </div>
            </div>
          );
        })}
      </section>

      {/* ================= RECENT ACTIVITY ================= */}

      <RecentActivitity
        activities={[
          { text: "New employee Rahul Sharma added.", time: "2 hours ago" },
          { text: "Salary updated for Anita Verma.", time: "5 hours ago" },
          { text: "3 employees marked as active.", time: "Yesterday" },
        ]}
      />
    </div>
  );
}

export default memo(Dashboard);
