import { memo, useState } from "react";

/**
 * AddEmployee Page
 * - Responsive design
 * - Accessible form
 * - Clean layout
 * - Ready for API integration
 */

function AddEmployee() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Simple validation
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

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Employee Data:", formData);

      // 🔥 Later connect with backend here
      // axios.post("/api/employees", formData)

      alert("Employee Added Successfully");

      // Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        role: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="w-full mx-auto bg-white shadow-md rounded-xl p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Add New Employee
          </h1>
          <p className="text-gray-500 mt-1">
            Fill the details below to add a new employee.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
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
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
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
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
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
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default memo(AddEmployee);
