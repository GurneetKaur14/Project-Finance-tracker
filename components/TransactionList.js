const TransactionList = ({ transactions, setTransactions }) => {
  const handleDelete = (id) => {
    // Ideally, delete from the server, here just from the state for simplicity
    setTransactions((prev) => prev.filter((trans) => trans.id !== id));
  };

  return (
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <span>Description: {transaction.description}</span>
          <span>Amount: {transaction.amount}</span>
          <span>Category: {transaction.category}</span>
          <button onClick={() => handleDelete(transaction.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
