import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');

    try {
      const res = await API.post('/auth/login', form);

      console.log('Login response:', res.data); // 👈 Debug: see actual response

      // ✅ Handle various response structures
      const token =
        res.data?.token ||
        res.data?.data?.token ||
        res.data?.accessToken;

      const user =
        res.data?.user ||
        res.data?.data?.user ||
        res.data?.data;

      if (!token) {
        throw new Error('Invalid login response from server - no token');
      }

      // ✅ Store values in localStorage
      localStorage.setItem('token', token);
      if (user?.id || user?._id) {
        localStorage.setItem('userId', user.id || user._id);
      }
      if (user?.name) {
        localStorage.setItem('name', user.name);
      }

      nav('/leads');
    } catch (error) {
      console.error('Login error:', error);

      setErr(
        error.response?.data?.message ||
        error.response?.data?.msg ||
        'Login failed'
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-purple-100 via-pink-100 to-orange-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>

        {err && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              autoComplete="email"
              className="w-full max-w-full sm:max-w-[90%] mx-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 block"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              className="w-full max-w-full sm:max-w-[90%] mx-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 block"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-[90%] mx-auto py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition-colors duration-200 block"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{' '}
          <span
            onClick={() => nav('/register')}
            className="text-purple-500 font-medium cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}