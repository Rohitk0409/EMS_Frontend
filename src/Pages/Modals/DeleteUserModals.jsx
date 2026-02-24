import { useQueryClient } from "@tanstack/react-query";
import { Trash2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../Hooks/api";

function DeleteUserModal({ isOpen, user, onClose, onSuccess }) {
  if (!isOpen || !user) return null;

  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      console.log(user);
      await api.delete(`/v1/user/delete/${user.id}`);
      await queryClient.invalidateQueries(["users"]);
      toast.success(`${user.name} deleted successfully`);
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete user");
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-title"
    >
      {/* Modal Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 id="delete-title" className="text-lg font-semibold text-gray-800">
            Delete User
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="mt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-600">
              <Trash2 size={18} />
            </div>

            <div>
              <p className="text-sm text-gray-600">
                Are you sure you want to delete
              </p>
              <p className="font-medium text-gray-800">{user.name}</p>
            </div>
          </div>

          <p className="text-xs text-gray-500">This action cannot be undone.</p>
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserModal;
