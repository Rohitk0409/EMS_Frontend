import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth/useAuth";
import AboutPage from "./AboutPage";
import api from "../Hooks/api";

function LoginPage() {
  const { login, auth } = useAuth(); // ✅ Access login function
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formData.email, formData.password); // ✅ Use context login

    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT SIDE - About Section */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-900">
        <AboutPage />
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login to EMP Pro
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-indigo-800 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
            >
              Login
            </button>
          </form>

          {/* Footer Text */}
          <p className="text-center text-sm text-gray-500 mt-6">
            © {new Date().getFullYear()} EMP Pro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
