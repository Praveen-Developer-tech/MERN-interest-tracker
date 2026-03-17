import { useState } from "react";
import api from "../api";

export default function AddAccount({ goBack }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("Customer");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Please fill all fields");
      return;
    }

    await api.post("/accounts", { name, phone, type });

    alert("Account Added Successfully!");
    goBack(); // navigate back to Accounts page
  };

  return (
    <div className="p-4 pb-28 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold">Add New Account</h1>
      <p className="text-gray-600 mb-6">Enter account details</p>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow space-y-4">

        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Phone Number</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Type</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Customer</option>
            <option>Lender</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded-lg font-semibold"
        >
          Add Account
        </button>
      </form>
    </div>
  );
}
