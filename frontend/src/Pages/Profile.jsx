import { FiUser, FiSettings, FiMail, FiPhone, FiLogOut } from "react-icons/fi";

export default function Profile() {
  return (
    <div className="p-4 pb-28 min-h-screen bg-gradient-to-b from-purple-100 to-gray-100">
      
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      {/* User Card */}
      <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 mb-6">
        <div className="bg-purple-200 p-4 rounded-full text-purple-700">
          <FiUser size={32} />
        </div>

        <div>
          <h2 className="text-xl font-semibold">Praveen</h2>
          <p className="text-gray-500">Interest Calculator User</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-xl shadow p-5 space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <FiMail className="text-purple-600" />
          <p className="text-gray-700">praveen@example.com</p>
        </div>

        <div className="flex items-center gap-3">
          <FiPhone className="text-purple-600" />
          <p className="text-gray-700">+91 9876543210</p>
        </div>

        <div className="flex items-center gap-3">
          <FiSettings className="text-purple-600" />
          <p className="text-gray-700">App Settings</p>
        </div>
      </div>

      {/* Logout */}
      <button className="bg-red-600 text-white w-full py-3 rounded-xl font-semibold shadow">
        <FiLogOut className="inline mr-2" />
        Logout
      </button>
    </div>
  );
}
