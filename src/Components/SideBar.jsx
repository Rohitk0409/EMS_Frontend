import {
  ChevronLeft,
  HelpCircle,
  LayoutDashboard,
  Menu,
  MessageSquare,
  UserPlus,
  Users,
} from "lucide-react";
import { memo, useState } from "react";
import { NavLink } from "react-router-dom";

/**
 * Sidebar Component
 *
 * Features:
 * - Expand / Collapse
 * - Accessible (ARIA labels)
 * - Responsive (Mobile friendly)
 * - Clean modular structure
 * - Smooth transitions
 * - Active route highlight
 */

const sidebarItems = [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Add Employee",
    route: "/add-employee",
    icon: UserPlus,
  },
  {
    name: "All Employees",
    route: "/employees",
    icon: Users,
  },
  {
    name: "Help",
    route: "/help",
    icon: HelpCircle,
  },
  {
    name: "Feedback",
    route: "/feedback",
    icon: MessageSquare,
  },
];

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      className={`h-screen bg-indigo-900 text-white transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      }`}
      aria-label="Main Sidebar"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-indigo-700">
        {isExpanded && (
          <h1 className="text-xl font-semibold tracking-wide">Admin Panel</h1>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-md hover:bg-indigo-700 transition"
          aria-label="Toggle Sidebar"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 space-y-2 px-2">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.route}
              className={({ isActive }) =>
                `flex items-center gap-4 p-3 rounded-lg transition-all duration-200 group
                ${
                  isActive
                    ? "bg-white text-indigo-800 font-semibold"
                    : "hover:bg-indigo-700"
                }`
              }
            >
              <Icon size={20} className="min-w-[20px]" />

              {isExpanded && (
                <span className="whitespace-nowrap">{item.name}</span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default memo(Sidebar);
