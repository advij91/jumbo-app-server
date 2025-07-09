import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../features/authThunks";
import { selectUser, selectAuthError } from "../../features/authSlice";

const Login = () => {
  const [staffid, setStaffid] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    if (user) {
      // Redirect to the page user was trying to access
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError("");
    setLoading(true);
    // if (staffid.length < 6) {
    //   setError("Staff ID must be 6 digits long");
    //   setLoading(false);
    //   return;
    // }
    try {
      await dispatch(loginThunk({ staffid, password }));
      // Redirect to the page user was trying to access
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      // setError("Invalid Staff ID or Password");
      console.error("Login failed", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Staff Login
        </h2>
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error === "Invalid credentials"
              ? "Incorrect Staff ID or Password"
              : error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Staff ID
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={staffid}
              onChange={(e) => setStaffid(e.target.value)}
              placeholder="Enter your 6-digit Staff ID"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded transition duration-200 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <span className="loader mr-2"></span> : null}
            Login
          </button>
        </form>
        <div className="flex justify-between mt-4 text-sm">
          <Link
            to="/auth/forgot-staffid"
            className="text-primary hover:underline"
          >
            Forgot Staff ID?
          </Link>
          <Link
            to="/auth/forgot-password"
            className="text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="mt-6 text-center text-sm">
          New staff?{" "}
          <Link
            to="/auth/signup"
            className="text-primary hover:underline font-semibold"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

// Loader spinner styling (add to your global CSS or Tailwind config)
// .loader {
//   border: 2px solid #f3f3f3;
//   border-top: 2px solid #3498db;
//   border-radius: 50%;
//   width: 16px;
//   height: 16px;
//   animation: spin 1s linear infinite;
// }
// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }
