import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-indigo-100 via-purple-100 to-pink-100">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Welcome to the App ✅
        </h1>
        <p className="text-gray-600 mb-8">
          Start by creating an account or logging in to continue.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200"
          >
            Register
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;