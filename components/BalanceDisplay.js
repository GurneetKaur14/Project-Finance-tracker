const BalanceDisplay = ({ transactions }) => {
  const totalBalance = transactions.reduce((total, trans) => total + trans.amount, 0);

  return (
    <div>
      <h2>Total Balance: ${totalBalance.toFixed(2)}</h2>
    </div>
  );
};

export default BalanceDisplay;
