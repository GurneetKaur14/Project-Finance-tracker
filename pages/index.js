// Importing components
import { useState, useEffect } from "react";
import { useRouter } from "next/router"; 
import axios from "axios";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import BalanceDisplay from "../components/BalanceDisplay";
import dynamic from "next/dynamic";
import WelcomePage from "../components/Welcome";

// Lazy load ExpenseChart
const LazyExpenseChart = dynamic(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("../components/ExpenseChart"));
      }, 3000);
    }),
  {
    loading: () => <p>Loading Chart...</p>,
    ssr: false,
  }
);

const Home = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchTransactions = async () => {
        try {
          const response = await axios.get("/api/transactions");
          setTransactions(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching transactions", error);
        }
      };
      fetchTransactions();
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleViewNews = () => {
    router.push("/news"); 
  };

  if (!isLoggedIn) {
    return <WelcomePage onLogin={handleLogin} />;
  }

  return (
    <div className="container">
      <h1>Finance Tracker</h1>
      <TransactionForm setTransactions={setTransactions} />
      <BalanceDisplay transactions={transactions} />
      <LazyExpenseChart transactions={transactions} />

      <button className="news-button" onClick={handleViewNews}>
        View Financial News
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TransactionList
          transactions={transactions}
          setTransactions={setTransactions}
        />
      )}

      <button className="logout" onClick={handleLogout}>
        Go Back to Login
      </button>
    </div>
  );
};

export default Home;
