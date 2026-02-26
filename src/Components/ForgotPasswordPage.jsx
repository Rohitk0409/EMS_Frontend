import { Link } from "react-router-dom";

// ForgotPasswordPage.jsx (basic skeleton)
export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Reset your password</h2>
          <p className="mt-2 text-gray-600">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <input
            type="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-indigo-500"
            placeholder="Email address"
          />
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700">
            Send reset link
          </button>
        </form>

        <p className="text-center text-sm">
          <Link to="/login" className="text-indigo-600 hover:underline">
            ← Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
