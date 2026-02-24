import { memo, useMemo, useState } from "react";

/**
 * AllEmployees Page
 * - Responsive Table
 * - Search functionality
 * - Active/Inactive filter
 * - Clean admin UI
 */

const employeesData = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    mobile: "9876543210",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Anita Verma",
    email: "anita@gmail.com",
    mobile: "9123456780",
    role: "HR",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Rohit Patel",
    email: "rohit@gmail.com",
    mobile: "9988776655",
    role: "Employee",
    status: "Active",
  },
  {
    id: 4,
    name: "Priya Singh",
    email: "priya@gmail.com",
    mobile: "9090909090",
    role: "Employee",
    status: "Inactive",
  },
];

function AllEmployees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Filtered Employees
  const filteredEmployees = useMemo(() => {
    return employeesData.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "All" || emp.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">All Employees</h1>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-64"
          />

          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            {/* Table Head */}
            <thead className="bg-indigo-800 text-white">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Mobile</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {emp.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{emp.email}</td>
                    <td className="px-6 py-4 text-gray-600">{emp.mobile}</td>
                    <td className="px-6 py-4 text-gray-600">{emp.role}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          emp.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default memo(AllEmployees);
