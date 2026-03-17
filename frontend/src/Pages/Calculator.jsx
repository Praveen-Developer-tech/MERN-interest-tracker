import { useState } from "react";

export default function Calculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState("monthly");
  const [type, setType] = useState("simple");

  const calcSimple = () => {
    if (!amount || !rate || !time) return 0;
    let t = mode === "monthly" ? time / 12 : time;
    return ((amount * rate * t) / 100).toFixed(2);
  };

  const calcCompound = () => {
    if (!amount || !rate || !time) return 0;
    let t = mode === "monthly" ? time / 12 : time;
    let A = (amount * (Math.pow(1 + rate / 100, t))).toFixed(2);
    return (A - amount).toFixed(2);
  };

  const interest = type === "simple" ? calcSimple() : calcCompound();
  const totalPayable = (Number(amount) + Number(interest)).toFixed(2);

  return (
    <div className="p-5 pb-24 min-h-screen bg-gradient-to-b from-indigo-100 to-blue-50">

      <h1 className="text-2xl font-bold mb-4">Interest Calculator</h1>

      {/* Input Card */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">

        <label className="font-semibold">Principal Amount (₹)</label>
        <input
          type="number"
          className="w-full p-2 mt-1 mb-4 border rounded-lg"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label className="font-semibold">Interest Rate (%)</label>
        <input
          type="number"
          className="w-full p-2 mt-1 mb-4 border rounded-lg"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />

        <label className="font-semibold">Time Period</label>
        <input
          type="number"
          placeholder="In months or years"
          className="w-full p-2 mt-1 mb-4 border rounded-lg"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        {/* Mode */}
        <label className="font-semibold">Time Mode</label>
        <select
          className="w-full p-2 mt-1 mb-4 border rounded-lg"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        {/* Type */}
        <label className="font-semibold">Interest Type</label>
        <select
          className="w-full p-2 mt-1 mb-4 border rounded-lg"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="simple">Simple Interest</option>
          <option value="compound">Compound Interest</option>
        </select>
      </div>

      {/* Output Card */}
      <div className="bg-blue-600 text-white p-5 rounded-xl shadow-lg mb-4">
        <p className="text-md">Total Interest</p>
        <h2 className="text-3xl font-bold">₹ {interest}</h2>
      </div>

      <div className="bg-green-600 text-white p-5 rounded-xl shadow-lg">
        <p className="text-md">Total Payable Amount</p>
        <h2 className="text-3xl font-bold">₹ {totalPayable}</h2>
      </div>

    </div>
  );
}
