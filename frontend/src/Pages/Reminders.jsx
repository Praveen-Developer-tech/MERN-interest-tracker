import { useEffect, useState } from "react";
import api from "../api";

export default function Reminders({ goBack }) {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/transactions/recent");
      const today = new Date();
      // Fake reminder logic: mark “overdue” if older than 30 days
      const flagged = res.data.map(t => {
        const txDate = new Date(t.date);
        const diff = (today - txDate) / (1000*60*60*24);
        return { ...t, status: diff > 30 ? "Overdue" : "Upcoming" };
      });
      setReminders(flagged);
    };
    load();
  }, []);

  return (
    <div className="p-5 min-h-screen bg-gradient-to-b from-yellow-50 to-gray-100 pb-24">
      <h1 className="text-2xl font-bold mb-4">Reminders</h1>
      {reminders.map(r => (
        <div key={r._id} className="bg-white p-4 rounded-xl shadow mb-3 flex justify-between">
          <div>
            <p className="font-semibold">{r.name}</p>
            <p className="text-gray-500 text-sm">{r.date} • {r.rate}%</p>
          </div>
          <p className={`font-bold ${r.status==="Overdue"?"text-red-600":"text-green-600"}`}>
            {r.status}
          </p>
        </div>
      ))}
      <button onClick={goBack}
        className="mt-4 w-full bg-gray-400 text-white py-2 rounded-lg font-bold">
        ← Back
      </button>
    </div>
  );
}
