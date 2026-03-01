import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Hooks/api";

export default function SendEmail() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");

  // Mask email for UI
  const maskEmail = (email) => {
    const [name, domain] = email.split("@");
    const maskedName =
      name.length > 2
        ? name[0] + "*".repeat(name.length - 2) + name[name.length - 1]
        : name[0] + "*";
    return `${maskedName}@${domain}`;
  };

  // Countdown logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendEmail = useCallback(
    async (e) => {
      e.preventDefault();

      if (!email) {
        setError("Email is required");
        return;
      }

      try {
        setSending(true);
        setError("");

        await api.post("/v1/forgot-password", { email });

        setSuccess(true);
        setTimer(300); // 5 minutes
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setSending(false);
      }
    },
    [email],
  );

  const handleResend = async () => {
    if (timer > 0) return;
    await handleSendEmail(new Event("submit"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">
        {!success ? (
          <>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Reset Password
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Enter your email and we’ll send a reset link
              </p>
            </div>

            <form onSubmit={handleSendEmail} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  placeholder="you@example.com"
                  aria-label="Email Address"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                  sending
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {sending ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-green-600 text-4xl">✓</div>
            <h2 className="text-2xl font-bold text-gray-800">
              Check your email
            </h2>
            <p className="text-gray-600 text-sm">
              We sent a reset link to <br />
              <span className="font-medium">{maskEmail(email)}</span>
            </p>

            <button
              onClick={handleResend}
              disabled={timer > 0}
              className={`mt-4 px-5 py-2 rounded-lg text-sm font-medium transition ${
                timer > 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {timer > 0
                ? `Resend in ${Math.floor(timer / 60)}:${(timer % 60)
                    .toString()
                    .padStart(2, "0")}`
                : "Resend Email"}
            </button>

            <Link
              to="/login"
              className="block text-indigo-600 hover:underline text-sm mt-4"
            >
              ← Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
