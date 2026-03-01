import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Hooks/api";

export default function SetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validatePassword = () => {
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    return null;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const validationError = validatePassword();
      if (validationError) {
        setError(validationError);
        return;
      }

      try {
        setLoading(true);
        setError("");

        await api.post(`/v1/reset-password/${token}`, {
          password: formData.password,
        });

        setSuccess(true);
      } catch (err) {
        setError(
          err.response?.data?.message || "Reset link expired or invalid token",
        );
      } finally {
        setLoading(false);
      }
    },
    [formData, token],
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">
        {!success ? (
          <>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Set New Password
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Enter your new password below
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    placeholder="Enter new password"
                    aria-label="New Password"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  placeholder="Confirm password"
                  aria-label="Confirm Password"
                />
              </div>

              {/* Show Password Toggle */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="accent-indigo-600"
                  />
                  <span>Show password</span>
                </label>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-green-600 text-4xl">✓</div>
            <h2 className="text-2xl font-bold text-gray-800">
              Password Updated
            </h2>
            <p className="text-gray-600 text-sm">
              Your password has been successfully updated.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-4 w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
