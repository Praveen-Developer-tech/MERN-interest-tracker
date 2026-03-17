import { useEffect, useState } from "react";
import api from "../api";

export default function AddTransaction({ goBack }) {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [date, setDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [type, setType] = useState("GIVEN");
  const [mode, setMode] = useState("Cash");

  const loadAccounts = async () => {
    const res = await api.get("/accounts");
    setAccounts(res.data);
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleSubmit = async () => {
    if (!selectedAccount) {
      alert("Please select an account");
      return;
    }

    const acc = accounts.find((a) => a._id === selectedAccount);

    const newTx = {
      accountId: selectedAccount,
      name: acc.name,
      phone: acc.phone,
      amount,
      rate,
      date,
      dueDate,
      type,
      mode,
    };

    try {
      await api.post("/transactions", newTx);
      alert("Transaction added successfully!");
      goBack();
    } catch (err) {
      alert("Error adding transaction");
      console.log(err);
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen pb-20">
      <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>

      <label className="font-semibold">Select Account</label>
      <select
        className="w-full p-2 rounded border mb-3"
        value={selectedAccount}
        onChange={(e) => setSelectedAccount(e.target.value)}
      >
        <option value="">-- Choose Account --</option>
        {accounts.map((a) => (
          <option key={a._id} value={a._id}>
            {a.name} ({a.phone})
          </option>
        ))}
      </select>

      <label className="font-semibold">Amount</label>
      <input type="number" className="w-full p-2 rounded border mb-3"
        value={amount} onChange={(e) => setAmount(e.target.value)} />

      <label className="font-semibold">Interest Rate (%)</label>
      <input type="number" className="w-full p-2 rounded border mb-3"
        value={rate} onChange={(e) => setRate(e.target.value)} />

      <label className="font-semibold">Transaction Date</label>
      <input type="date" className="w-full p-2 rounded border mb-3"
        value={date} onChange={(e) => setDate(e.target.value)} />

      <label className="font-semibold">Due Date</label>
      <input type="date" className="w-full p-2 rounded border mb-3"
        value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

      <label className="font-semibold">Type</label>
      <select className="w-full p-2 rounded border mb-3"
        value={type} onChange={(e) => setType(e.target.value)}>
        <option value="GIVEN">Given</option>
        <option value="TAKEN">Taken</option>
      </select>

      <label className="font-semibold">Mode</label>
      <select className="w-full p-2 rounded border mb-3"
        value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="Cash">Cash</option>
        <option value="Bank">Bank Transfer</option>
        <option value="UPI">UPI</option>
      </select>

      <button onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 rounded-lg font-bold">
        Save Transaction
      </button>

      <button onClick={goBack}
        className="w-full mt-3 bg-gray-500 text-white py-2 rounded-lg font-bold">
        Cancel
      </button>
    </div>
  );
}
