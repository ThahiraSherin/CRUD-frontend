import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState([]);
  const [serverMsg, setServerMsg] = useState('');
  const nav = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getError = (field) => {
    const errObj = errors.find((e) => e.param === field);
    return errObj ? errObj.msg : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setServerMsg('');

    try {
      const res = await API.post('/register', form);
      if (res.data.success) {
        alert(res.data.message || 'Registered successfully');
        nav('/login');
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setServerMsg(error.response.data.message);
      } else {
        setServerMsg('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-purple-100 via-pink-100 to-orange-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Register
        </h2>

        {serverMsg && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {serverMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full sm:max-w-[90%] mx-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 block"
            />
            {getError('name') && (
              <p className="text-red-500 text-sm mt-1">{getError('name')}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full sm:max-w-[90%] mx-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 block"
            />
            {getError('email') && (
              <p className="text-red-500 text-sm mt-1">{getError('email')}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full sm:max-w-[90%] mx-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 block"
            />
            {getError('password') && (
              <p className="text-red-500 text-sm mt-1">
                {getError('password')}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full sm:w-[90%] mx-auto py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition-colors duration-200 block"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{' '}
          <span
            onClick={() => nav('/login')}
            className="text-purple-500 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
