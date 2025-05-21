import React from "react";
import { Link } from "react-router-dom";
// import { LockClosedIcon } from "@heroicons/react/24/outline";

const Unauthorized = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center max-w-md w-full">
      {/* <LockClosedIcon className="h-16 w-16 text-red-500 mb-4" /> */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
      <p className="text-gray-600 mb-6 text-center">
        You do not have permission to view this page.<br />
        Please contact your administrator if you believe this is a mistake.
      </p>
      <Link
        to="/"
        className="inline-block bg-primary hover:bg-secondary text-white font-semibold px-6 py-2 rounded transition duration-200"
      >
        Go to Home
      </Link>
    </div>
  </div>
);

export default Unauthorized;