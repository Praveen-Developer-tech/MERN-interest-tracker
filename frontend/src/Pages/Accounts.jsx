import { useEffect, useState } from "react";
import api from "../api";
import { FiUser } from "react-icons/fi"; // simple user icon

export default function Accounts({ setPage }) {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState("");

  const loadAccounts = async () => {
    const res = await api.get("/accounts");
    setAccounts(res.data);
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const filteredAccounts = accounts.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 pb-28 min-h-screen bg-gradient-to-b from-purple-100 to-gray-100">
      
      {/* Header */}
      <h1 className="text-2xl font-bold mb-1">Accounts</h1>
      <p className="text-gray-600 mb-4">All registered accounts</p>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-xl border shadow-sm mb-4"
      />

      {/* Add New Account */}
      <button
        onClick={() => setPage("addAccount")}
        className="bg-blue-600 text-white w-full py-2 rounded-xl font-semibold mb-4 shadow"
      >
        + Add New Account
      </button>

      {/* Account List */}
      {filteredAccounts.map((a) => (
        <div
          key={a._id}
          onClick={() => setPage({ name: "accountDetails", account: a })}
          className="bg-white p-4 rounded-xl shadow mb-3 flex justify-between items-center cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            {/* Simple Icon Instead of Photo */}
            <div className="bg-purple-200 p-3 rounded-full text-purple-700">
              <FiUser size={20} />
            </div>

            <div>
              <p className="font-semibold text-lg">{a.name}</p>
              <p className="text-gray-500 text-sm">{a.phone}</p>
            </div>
          </div>

          <p className="text-blue-600 font-semibold">{a.type}</p>
        </div>
      ))}
    </div>
  );
}
