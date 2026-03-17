import { useEffect, useState } from "react";
import api from "../api";
import { FiSearch } from "react-icons/fi";

export default function Money({ setPage }) {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const loadTransactions = async () => {
    const res = await api.get("/transactions/recent"); // Load last 50 instead of 5 (upgrade backend later)
    setTransactions(res.data);
    setFiltered(res.data);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  // Filter within list
  const handleSearch = (text) => {
    setSearch(text);

    if (text.trim() === "") {
      setFiltered(transactions);
    } else {
      setFiltered(
        transactions.filter((t) =>
          t.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const totalGiven = filtered
    .filter((t) => t.type === "GIVEN")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalTaken = filtered
    .filter((t) => t.type === "TAKEN")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-4 pb-24 bg-gradient-to-b from-purple-100 to-gray-100 min-h-screen">

      {/* Title */}
      <h1 className="text-2xl font-bold mb-2">Money</h1>
      <p className="text-gray-600 mb-4">Manage all your transactions</p>

      {/* Search Bar */}
      <div className="relative mb-4">
        <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 p-3 rounded-xl border shadow-sm"
        />
      </div>

      {/* Summary Bar */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white p-3 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Total Given</p>
          <p className="text-green-600 font-bold text-xl">₹ {totalGiven}</p>
        </div>

        <div className="bg-white p-3 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Total Taken</p>
          <p className="text-red-600 font-bold text-xl">₹ {totalTaken}</p>
        </div>
      </div>

      {/* Add Transaction Button */}
      <button
        onClick={() => setPage({ name: "addTransaction" })}
        className="bg-green-600 text-white w-full py-3 rounded-xl font-semibold shadow mb-5"
      >
        + Add New Transaction
      </button>

      {/* List Heading */}
      <h2 className="text-lg font-semibold mb-2">All Transactions</h2>

      {/* Transactions List */}
      {filtered.map((t, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-xl shadow mb-3 flex justify-between"
        >
          <div>
            <p className="font-semibold">{t.name}</p>
            <p className="text-gray-500 text-sm">
              {t.date} • {t.rate}%
            </p>
            <span
              className={`text-xs font-semibold mt-1 inline-block px-2 py-1 rounded ${
                t.type === "GIVEN"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {t.type}
            </span>
          </div>

          <p
            className={`font-bold text-lg ${
              t.type === "GIVEN" ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹ {t.amount}
          </p>
        </div>
      ))}
    </div>
  );
}
