import { useState } from "react";
import axios from "axios";

const TransactionForm = ({ setTransactions }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !description || !category) {
      alert("All fields are required!");
      return;
    }
    
    try {
      const newTransaction = { amount: parseFloat(amount), description, category };
      const response = await axios.post("/api/transactions", newTransaction);
      setTransactions((prevTransactions) => [...prevTransactions, response.data]);
    } catch (error) {
      console.error("Error adding transaction", error);
    }

    setAmount("");
    setDescription("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category (e.g. Food, Transport)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;

