import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth/useAuth";
import AboutPage from "./AboutPage";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLogging, setIsLogging] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setIsLogging(true);
      await login(formData.email.trim(), formData.password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err?.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left - Branding / About Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white">
        <div className="w-full h-full flex items-center justify-center p-8 xl:p-16">
          <AboutPage />
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-5 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h1>
            <p className="mt-2 text-gray-600">Log in to your EMP Pro account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition duration-150"
                  placeholder="name@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  {/* Forgot Password Link */}
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-150 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition duration-150"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLogging}
              className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {isLogging ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center text-sm pt-2">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-150"
              >
                Create account
              </Link>
            </div>
          </form>

          {/* Footer */}
          <p className="mt-10 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} EMP Pro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
