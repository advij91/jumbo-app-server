import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [staffid, setStaffid] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    // TODO: Add logic to send password reset link or OTP
    setTimeout(() => {
      setLoading(false);
      setMessage("If your Staff ID and email are correct, a password reset link will be sent.");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {message && <div className="text-green-600 text-center mb-4">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Staff ID</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={staffid}
              onChange={e => setStaffid(e.target.value)}
              placeholder="Enter your Staff ID"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Registered Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <span className="loader mr-2"></span> : null}
            Send Reset Link
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <Link to="/auth/login" className="text-blue-600 hover:underline font-semibold">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
