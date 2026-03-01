import {
  ChevronLeft,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { memo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/Auth/useAuth";

const sidebarItems = [
  { name: "Dashboard", route: "/dashboard", icon: LayoutDashboard },
  { name: "Add Employee", route: "/add-employee", icon: UserPlus },
  { name: "All Employees", route: "/employees", icon: Users },
];

function Sidebar({
  isMobileOpen,
  setIsMobileOpen,
  isCollapsed,
  setIsCollapsed,
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { auth, logout } = useAuth();
 
  const user = auth?.user;
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen z-50
          bg-gradient-to-b from-indigo-900 to-indigo-950
          text-white flex flex-col
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-700/60">
          {!isCollapsed && <h1 className="text-xl font-semibold">EMP Pro</h1>}

          <div className="flex items-center gap-2">
            {/* Desktop collapse */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-2 rounded-lg hover:bg-indigo-700/80"
            >
              {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
            </button>

            {/* Mobile close */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 space-y-1.5 px-3 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.route}
                to={item.route}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-xl transition-all
                  ${
                    isActive
                      ? "bg-indigo-700 font-medium"
                      : "hover:bg-indigo-800/60"
                  }`
                }
              >
                <Icon size={22} />
                {!isCollapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Profile Section */}
        <div className="relative border-t border-indigo-700/60 p-4">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-full flex items-center gap-3 hover:bg-indigo-800/40 rounded-xl p-2"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-semibold">
              {firstLetter}
            </div>

            {!isCollapsed && (
              <div className="text-left">
                <p className="text-sm font-medium truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-indigo-300 truncate">
                  {user?.email}
                </p>
              </div>
            )}

            {!isCollapsed && <User size={18} />}
          </button>

          {showProfileMenu && (
            <div
              className={`
                absolute bottom-full mb-3 z-50
                bg-indigo-950 border border-indigo-700/70
                rounded-xl shadow-xl
                ${isCollapsed ? "left-full ml-3 w-56" : "left-4 right-4"}
              `}
            >
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-indigo-800/60 text-red-300"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default memo(Sidebar);
