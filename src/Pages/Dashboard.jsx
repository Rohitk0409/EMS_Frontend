import { Activity, UserCheck, UserPlus, Users } from "lucide-react";
import { memo } from "react";

/**
 * Dashboard Page
 * - Fully responsive
 * - Accessible
 * - Clean grid layout
 * - Production ready
 */

const statsData = [
  {
    title: "Total Employees",
    value: 120,
    icon: Users,
    color: "bg-indigo-600",
  },
  {
    title: "Active Employees",
    value: 95,
    icon: UserCheck,
    color: "bg-green-600",
  },
  {
    title: "New This Month",
    value: 12,
    icon: UserPlus,
    color: "bg-yellow-500",
  },
  {
    title: "Pending Approvals",
    value: 5,
    icon: Activity,
    color: "bg-red-500",
  },
];

function Dashboard() {
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statsData.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition"
            >
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <h2 className="text-2xl font-bold text-gray-800 mt-1">
                  {item.value}
                </h2>
              </div>

              <div
                className={`${item.color} p-3 rounded-lg text-white`}
                aria-hidden="true"
              >
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </section>

      {/* ================= RECENT ACTIVITY ================= */}
      <section
        aria-label="Recent Activity"
        className="mt-10 bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>

        <ul className="space-y-4">
          <li className="flex justify-between items-center border-b pb-3">
            <span className="text-gray-600">
              New employee <strong>Rahul Sharma</strong> added.
            </span>
            <span className="text-sm text-gray-400">2 hours ago</span>
          </li>

          <li className="flex justify-between items-center border-b pb-3">
            <span className="text-gray-600">
              Salary updated for <strong>Anita Verma</strong>.
            </span>
            <span className="text-sm text-gray-400">5 hours ago</span>
          </li>

          <li className="flex justify-between items-center">
            <span className="text-gray-600">3 employees marked as active.</span>
            <span className="text-sm text-gray-400">Yesterday</span>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default memo(Dashboard);
