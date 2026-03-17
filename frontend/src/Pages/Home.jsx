import { useEffect, useState } from "react";
import api from "../api";
import user1 from "../assets/user1.jpg";
import user2 from "../assets/user2.jpg";
import user3 from "../assets/user3.jpg";
import user4 from "../assets/user4.jpg";

export default function Home() {
  const [recent, setRecent] = useState([]);
  const [total, setTotal] = useState(0);
  const [upcoming, setUpcoming] = useState([]);

  const loadData = async () => {
    const res1 = await api.get("/transactions/recent");
    const res2 = await api.get("/transactions/total");
    const res3 = await api.get("/transactions/due");

    setRecent(res1.data);
    setTotal(res2.data.total);

    const cards = [
      ...res3.data.today.map(t => ({ amount: t.amount, day: "Today", img: user2 })),
      ...res3.data.tomorrow.map(t => ({ amount: t.amount, day: "Tomorrow", img: user3 }))
    ];

    setUpcoming(cards);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-4 pb-24 min-h-screen bg-gradient-to-b from-purple-100 to-gray-100">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Hello Praveen!</h1>
          <p className="text-gray-600">Welcome back</p>
        </div>
        <img src={user1} alt="" className="w-12 h-12 rounded-full shadow" />
      </div>

      <button
  onClick={() => setPage("reminders")}
  className="w-full bg-green-500 text-white py-2 rounded-xl mb-4 font-semibold"
>
  🔔 View Reminders
</button>


      {/* Search */}
      <input
        type="text"
        placeholder="Search name, keyword..."
        className="w-full p-3 rounded-xl border shadow-sm mb-5"
      />

      {/* Outstanding */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-5 rounded-xl text-white mb-6">
        <p>Total Outstanding</p>
        <h2 className="text-3xl font-bold">₹ {total}</h2>
        <button className="w-full bg-white text-blue-700 font-semibold mt-4 py-2 rounded-xl">
          Redeem Now
        </button>
      </div>

      {/* Payments Due */}
      <h2 className="font-semibold text-lg mb-2">Payments Due</h2>

      <div className="flex gap-4 overflow-x-scroll scrollbar-hide mb-6">
        {upcoming.map((u, i) => (
          <PaymentCard key={i} amount={u.amount} day={u.day} img={u.img} />
        ))}
      </div>

      {/* Investor Performance */}
      <h2 className="font-semibold text-lg mb-2">Investor Performance</h2>

      {recent.map((t, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow mb-3 flex justify-between">
          <div className="flex gap-3">
            <img src={user4} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">{t.name}</p>
              <p className="text-gray-500 text-sm">{t.date} • {t.rate}%</p>
            </div>
          </div>
          <p className="font-bold">₹ {t.amount}</p>
        </div>
      ))}

    </div>
  );
}
 


function PaymentCard({ amount, day, img }) {
  return (
    <div className="bg-white p-3 rounded-xl shadow min-w-[90px] text-center">
      <p className="font-bold text-red-500">₹ {amount}</p>
      <p className="text-sm text-gray-400">{day}</p>
      <img src={img} className="w-12 h-12 rounded-full mx-auto mt-2" />
    </div>
  );
}
