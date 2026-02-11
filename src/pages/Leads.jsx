import { useEffect, useState } from "react";
import API from "../services/api";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({
    _id: null,
    name: "",
    email: "",
    phone: "",
    status: "New",
  });

  const loadLeads = async () => {
    const res = await API.get("/leads");
    setLeads(res.data || []);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form._id) {
      await API.put(`/leads/${form._id}`, form);
    } else {
      await API.post("/leads", form);
    }

    setForm({ _id: null, name: "", email: "", phone: "", status: "New" });
    loadLeads();
  };

  const editLead = (lead) => {
    setForm(lead);
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    await API.delete(`/leads/${id}`);
    loadLeads();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 bg-linear-to-r from-purple-100 via-pink-100 to-orange-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Lead Management</h2>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md shadow"
        >
          Logout
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">
          {form._id ? "Edit Lead" : "Add Lead"}
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-gray-300 px-4 py-2 rounded-md w-56 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-gray-300 px-4 py-2 rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="border border-gray-300 px-4 py-2 rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="border border-gray-300 px-4 py-2 rounded-md w-40 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Lost</option>
          </select>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md shadow"
          >
            {form._id ? "Update" : "Save"}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Phone</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-gray-50">
                <td className="border p-3">{lead.name}</td>
                <td className="border p-3">{lead.email}</td>
                <td className="border p-3">{lead.phone}</td>
                <td className="border p-3">{lead.status}</td>
                <td className="border p-3 text-center space-x-4">
                  <button
                    onClick={() => editLead(lead)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteLead(lead._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {leads.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;
