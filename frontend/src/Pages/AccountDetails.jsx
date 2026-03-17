import { useEffect, useState } from "react";
import api from "../api";

export default function AccountDetails({ data, goBack }) {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    given: 0,
    taken: 0,
    outstanding: 0,
  });

  // Load all transactions of this account
  const loadTransactions = async () => {
    try {
      const res = await api.get(`/transactions/${data._id}`); // accountId
      setTransactions(res.data);

      // Calculate summary
      let given = 0;
      let taken = 0;

      res.data.forEach((t) => {
        if (t.type === "GIVEN") given += t.amount;
        else taken += t.amount;
      });

      setSummary({
        given,
        taken,
        outstanding: given - taken,
      });
    } catch (err) {
      console.log("Account details load error:", err);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div className="p-5 bg-gray-100 min-h-screen pb-20">
      {/* Header */}
      <button
        onClick={goBack}
        className="text-blue-600 underline mb-3 font-semibold"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-1">{data.name}</h1>
      <p className="text-gray-600 mb-5">{data.phone}</p>

      {/* Summary Box */}
      <div className="bg-white rounded-xl p-4 shadow mb-5">
        <h2 className="text-lg font-semibold mb-3">Summary</h2>

        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Total Given:</span>
          <span className="font-bold text-green-700">₹ {summary.given}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Total Taken:</span>
          <span className="font-bold text-red-700">₹ {summary.taken}</span>
        </div>

        <div className="flex justify-between mt-3 border-t pt-3">
          <span className="text-gray-900 font-semibold">Outstanding:</span>
          <span
            className={
              "font-bold " +
              (summary.outstanding >= 0
                ? "text-green-800"
                : "text-red-800")
            }
          >
            ₹ {summary.outstanding}
          </span>
        </div>
      </div>

      {/* Transaction History */}
      <h2 className="text-xl font-semibold mb-3">Transactions</h2>

      {transactions.length === 0 && (
        <p className="text-center text-gray-500">No transactions found.</p>
      )}

      {transactions.map((t) => (
        <div
          key={t._id}
          className="bg-white p-4 rounded-xl shadow mb-3 flex justify-between"
        >
          <div>
            <p className="font-semibold">{t.type}</p>
            <p className="text-gray-600 text-sm">
              {t.date} • {t.rate}%
            </p>
            <p className="text-gray-500 text-sm">Mode: {t.mode}</p>
          </div>

          <span
            className={
              "font-bold text-lg " +
              (t.type === "GIVEN" ? "text-green-700" : "text-red-700")
            }
          >
            ₹ {t.amount}
          </span>
        </div>
      ))}
    </div>
  );
}
