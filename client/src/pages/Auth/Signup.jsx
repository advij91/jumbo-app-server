import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    staffid: "",
    name: "",
    password: "",
    department: "",
    level: "",
    contact: "",
    email: "",
    role: "Staff",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // TODO: Add signup logic here
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Staff Signup</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Staff ID</label>
              <input name="staffid" type="text" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.staffid} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Name</label>
              <input name="name" type="text" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Password</label>
              <input name="password" type="password" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.password} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Department</label>
              <select name="department" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.department} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="executive">Executive</option>
                <option value="admin">Admin</option>
                <option value="sales">Sales</option>
                <option value="accounts">Accounts</option>
                <option value="humanresource">Human Resource</option>
                <option value="housekeeping">Housekeeping</option>
                <option value="kitchen">Kitchen</option>
                <option value="delivery partner">Delivery Partner</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Level</label>
              <input name="level" type="text" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.level} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Contact</label>
              <input name="contact" type="text" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.contact} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input name="email" type="email" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.email} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Role</label>
              <select name="role" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={form.role} onChange={handleChange} required>
                <option value="Admin">Admin</option>
                <option value="Owner">Owner</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
                <option value="Partner">Partner</option>
                <option value="Rider">Rider</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200 flex items-center justify-center" disabled={loading}>
            {loading ? <span className="loader mr-2"></span> : null}
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          Already have an account? <Link to="/auth/login" className="text-blue-600 hover:underline font-semibold">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
