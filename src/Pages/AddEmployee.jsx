import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { memo, useState } from "react";
import toast from "react-hot-toast";
import api from "../Hooks/api";

function AddEmployee() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove field error on change
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter valid 10 digit number";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    return newErrors;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    // Stop if validation fails
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix form errors");
      return;
    }

    try {
      setIsLoading(true);

      const res = await api.post("/v1/user/create", formData);
      await queryClient.invalidateQueries(["users"]);
      toast.success(res?.data?.message || "Employee added successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        role: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add employee");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="w-full mx-auto bg-white shadow-md rounded-xl p-6 sm:p-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Add New Employee
          </h1>
          <p className="text-gray-500 mt-1">
            Fill the details below to add a new employee.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter Full Name"
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email Id"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                placeholder="Enter Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.mobile && (
                <p className="text-sm text-red-500 mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.role ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="HR">HR</option>
                <option value="Employee">Employee</option>
              </select>
              {errors.role && (
                <p className="text-sm text-red-500 mt-1">{errors.role}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-right">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 rounded-lg font-medium text-white transition ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Adding...
                </span>
              ) : (
                "Add Employee"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default memo(AddEmployee);
