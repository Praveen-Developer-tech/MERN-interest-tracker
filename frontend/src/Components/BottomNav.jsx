import {
  HomeIcon,
  UserGroupIcon,
  BanknotesIcon,
  CalculatorIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function BottomNav({ current, setCurrent }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t py-3 flex justify-around z-50">
      <button onClick={() => setCurrent("home")} className="flex flex-col items-center">
        <HomeIcon className={`h-6 ${current === "home" ? "text-blue-600" : "text-gray-500"}`} />
        <p className={`text-xs ${current === "home" ? "text-blue-600" : "text-gray-500"}`}>Home</p>
      </button>

      <button onClick={() => setCurrent("accounts")} className="flex flex-col items-center">
        <UserGroupIcon className={`h-6 ${current === "accounts" ? "text-blue-600" : "text-gray-500"}`} />
        <p className={`text-xs ${current === "accounts" ? "text-blue-600" : "text-gray-500"}`}>Accounts</p>
      </button>

      <button onClick={() => setCurrent("money")} className="flex flex-col items-center">
        <BanknotesIcon className={`h-6 ${current === "money" ? "text-blue-600" : "text-gray-500"}`} />
        <p className={`text-xs ${current === "money" ? "text-blue-600" : "text-gray-500"}`}>Money</p>
      </button>

      <button onClick={() => setCurrent("calculator")} className="flex flex-col items-center">
        <CalculatorIcon className={`h-6 ${current === "calculator" ? "text-blue-600" : "text-gray-500"}`} />
        <p className={`text-xs ${current === "calculator" ? "text-blue-600" : "text-gray-500"}`}>Calc</p>
      </button>

      <button onClick={() => setCurrent("profile")} className="flex flex-col items-center">
        <UserIcon className={`h-6 ${current === "profile" ? "text-blue-600" : "text-gray-500"}`} />
        <p className={`text-xs ${current === "profile" ? "text-blue-600" : "text-gray-500"}`}>Profile</p>
      </button>
    </div>
  );
}
