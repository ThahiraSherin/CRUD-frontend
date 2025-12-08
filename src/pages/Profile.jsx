import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState({
    name: '',
    age: '',
    dob: '',
    contact: '',
  });
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const nav = useNavigate();

  // ✅ Load profile
  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        return nav('/login');
      }

      try {
        const res = await API.get(`/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-user-id': userId, // ✅ optional if backend supports
          },
        });

        const data = res.data?.data || res.data;
        setUser({
          name: data?.name || '',
          age: data?.age || '',
          dob: data?.dob || '',
          contact: data?.contact || '',
        });
      } catch (err) {
        console.error('Profile load error:', err);
        setErrMsg(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [nav]);

  // ✅ Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      return nav('/login');
    }

    try {
      const updates = {
        userId, // ✅ backend needs this
        name: user.name,
        age: user.age,
        dob: user.dob,
        contact: user.contact,
      };

      const res = await API.put('/profile', updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data?.data || res.data;
      setUser({
        name: data?.name || '',
        age: data?.age || '',
        dob: data?.dob || '',
        contact: data?.contact || '',
      });

      alert('✅ Profile updated successfully');
    } catch (err) {
      console.error('Profile update error:', err);
      alert(err.response?.data?.message || 'Profile update failed');
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-100">
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
      </div>
    );

  if (errMsg)
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-100 px-4">
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-red-600 mb-3">{errMsg}</p>
          <button
            onClick={() => nav('/login')}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Profile
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Name</label>
            <input
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Age</label>
            <input
              type="number"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
              value={user.age}
              onChange={(e) => setUser({ ...user, age: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">DOB</label>
            <input
              type="date"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
              value={user.dob ? user.dob.split('T')[0] : ''}
              onChange={(e) => setUser({ ...user, dob: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Contact</label>
            <input
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
              value={user.contact}
              onChange={(e) => setUser({ ...user, contact: e.target.value })}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto py-3 px-6 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => {
                localStorage.clear();
                nav('/login');
              }}
              className="w-full sm:w-auto py-3 px-6 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500"
            >
              Logout
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
