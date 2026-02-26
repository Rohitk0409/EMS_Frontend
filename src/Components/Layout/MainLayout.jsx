import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar";

function MainLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content Wrapper */}
      <div
        className={`
          flex flex-col flex-1 transition-all duration-300
          ${isCollapsed ? "lg:ml-20" : "lg:ml-64"}
        `}
      >
        {/* Mobile Topbar */}
        <header className="lg:hidden flex items-center p-4 bg-white shadow">
          <button onClick={() => setIsMobileOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="ml-4 font-semibold">EMP Pro</h1>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
