import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";

function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1 bg-gray-100 p-2">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
