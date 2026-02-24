import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { memo, useMemo, useState } from "react";
import { useAuth } from "../Context/Auth/useAuth";
import api from "../Hooks/api";
import { fetchTenantUsers } from "../Hooks/usePrefetch";
import DeleteUserModal from "./Modals/DeleteUserModals";
// Fetch function

function AllEmployees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [deleteUser, setDeleteUser] = useState(null);

  const { auth } = useAuth();

  const companyId = auth?.companyId;

  // 🔥 This will use prefetched data automatically
  const { data: employeesData = [], isLoading } = useQuery({
    queryKey: ["users", companyId],
    queryFn: () => fetchTenantUsers(api),
    enabled: !!companyId,
  });

  const filteredEmployees = useMemo(() => {
    return employeesData.filter((emp) => {
      const matchesSearch =
        emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "All" || emp.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [employeesData, searchTerm, filterStatus]);

  if (isLoading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6"
        role="status"
        aria-live="polite"
      >
        {/* Spinner */}
        <div
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />

        {/* Text */}
        <p className="mt-4 text-gray-600 text-sm sm:text-base font-medium">
          Loading employees...
        </p>
      </div>
    );
  }

  return (
    <>
      {deleteUser && (
        <DeleteUserModal
          isOpen={deleteUser}
          onClose={() => {
            setDeleteUser(null);
          }}
          user={deleteUser}
        />
      )}
      <div className="min-h-screen bg-gray-100 p-2">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">All Employees</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-64"
            />

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

        <div className="bg-white rounded-xl shadow-sm ">
          <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-800 text-white">
                <tr>
                  <th className="px-6 py-3">Sr. No.</th>
                  <th className="px-6 py-3">Name</th>

                  <th className="px-6 py-3">Mobile</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp, index) => (
                    <tr
                      key={emp._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {/* Avatar */}
                          <div
                            className="flex items-center justify-center h-9 w-9 rounded-full bg-indigo-600 text-white text-sm font-semibold uppercase shadow-sm"
                            aria-hidden="true"
                          >
                            {emp?.name?.charAt(0) || "U"}
                          </div>

                          {/* Name + optional email */}
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-800">
                              {emp?.name}
                            </span>
                            <span className="text-xs text-gray-500 hidden sm:block">
                              {emp?.email}
                            </span>
                          </div>
                        </div>
                      </td>

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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {/* Edit Button */}
                          <button
                            onClick={() => handleEdit(emp)}
                            className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
                            aria-label={`Edit ${emp.name}`}
                          >
                            <Pencil size={16} strokeWidth={2} />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => {
                              setDeleteUser({ id: emp?._id, name: emp?.name });
                            }}
                            className="flex items-center justify-center h-8 w-8 rounded-md bg-red-50 text-red-600 hover:bg-red-100 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
                            aria-label={`Delete ${emp.name}`}
                          >
                            <Trash2 size={16} strokeWidth={2} />
                          </button>
                        </div>
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
    </>
  );
}

export default memo(AllEmployees);
