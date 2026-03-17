import { useState } from "react";
import Home from "./Pages/Home";
import Accounts from "./Pages/Accounts";
import Money from "./Pages/Money";
import Calculator from "./Pages/Calculator";
import Profile from "./Pages/Profile";
import AddAccount from "./Pages/AddAccount";
import AddTransaction from "./Pages/AddTransaction";
import AccountDetails from "./Pages/AccountDetails";
import BottomNav from "./components/BottomNav";
import Reminders from "./Pages/Reminders";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedAccount, setSelectedAccount] = useState(null);

  const changePage = (value) => {
    if (typeof value === "string") {
      setPage(value);
    } else {
      setPage(value.name);

      if (value.account) setSelectedAccount(value.account);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-24">

      {page === "home" && <Home />}

      {page === "accounts" && (
        <Accounts setPage={changePage} />
      )}

      {page === "money" && (
        <Money setPage={changePage} />
      )}

      {page === "calculator" && <Calculator />}

      {page === "profile" && <Profile />}

      {page === "addAccount" && (
        <AddAccount goBack={() => changePage("accounts")} />
      )}

      {page === "addTransaction" && (
        <AddTransaction goBack={() => changePage("money")} />
      )}

      {page === "accountDetails" && selectedAccount && (
        <AccountDetails
          data={selectedAccount}
          goBack={() => changePage("accounts")}
        />
      )}
      {page === "reminders" && (
        <Reminders goBack={() => setPage("home")} />
      )}

      <BottomNav current={page} setCurrent={changePage} />
    </div>
  );
}
