let transactions = [];

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(transactions);
  }

  if (req.method === "POST") {
    const newTransaction = { ...req.body, id: Date.now() };
    transactions.push(newTransaction);
    return res.status(201).json(newTransaction);
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    transactions = transactions.filter((transaction) => transaction.id !== id);
    return res.status(200).json({ message: "Transaction deleted" });
  }

  res.status(405).json({ message: "Method not allowed" });
}
