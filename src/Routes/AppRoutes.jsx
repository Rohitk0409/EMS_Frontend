import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../Components/Layout/MainLayout";
import LoginPage from "../Components/LoginPage";
import SendEmail from "../Components/PasswoardAuthentication/SendEmail";
import SetPassword from "../Components/PasswoardAuthentication/SetPassword";
import SignUpPage from "../Components/SignUpPage";
import { useAuth } from "../Context/Auth/useAuth";
import AddEmployee from "../Pages/AddEmployee";
import AllEmployees from "../Pages/AllEmployees";
import Dashboard from "../Pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
/**
 * Central Routing Configuration
 */

function AppRoutes() {
  const { auth } = useAuth();
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signUp" element={<SignUpPage />} />

      <Route path="/forgot-password" element={<SendEmail />} />
      <Route path="/set-password" element={<SetPassword />} />
      {/* Layout Wrapper */}
      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Default Redirect */}
        <Route index element={<Navigate to="dashboard" replace />} />
        {/*pages*/}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-employee" element={<AddEmployee />} />
        <Route path="employees" element={<AllEmployees />} />
      </Route>
      {/* 404 Page */}
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center h-screen text-xl font-semibold">
            404 - Page Not Found
          </div>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
